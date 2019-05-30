const fs = require('fs');
const log4js = require('log4js');
const {Client, Collection} = require('discord.js');
const logger = log4js.getLogger('CommandHandler');

/**
 * @return {boolean}
 */
module.exports = function constructor() {
    logger.trace('Setting up CommandHandler...');

    Client.prototype.commands = new Collection();

    let groupFiles = fs.readdirSync('./commands');
    try {
        groupFiles.forEach((groupFile) => {
            let groupStat = fs.statSync(`./commands/${groupFile}`);
            if (!groupStat.isDirectory()) {
                logger.warn(`${groupFile} is not dir`);
                return;
            }

            let commandFiles = fs.readdirSync(`./commands/${groupFile}`);
            commandFiles.forEach((commandFile) => {
                if (!commandFile.endsWith('.js')) {
                    logger.warn(`${groupFile}/${commandFile} is not a javascript file`);
                    return;
                }

                let commandPath = `../../commands/${groupFile}/${commandFile}`;
                let command;
                try {
                    command = require(commandPath);
                    delete require.cache[require.resolve(commandPath)];
                } catch (error) {
                    logger.fatal(`Error while creating ${groupFile}/${commandFile}!\n${error.stack}`);
                    throw new Error();
                }

                if (command.name === undefined) {
                    logger.fatal(`${groupFile}/${commandFile} doesn't have a name`);
                    throw new Error();
                }


                if (command.triggers === undefined || command.triggers.length === 0) {
                    logger.fatal(`${groupFile}/${commandFile} doesn't have a trigger`);
                    throw new Error();
                }

                command.triggers.forEach((trigger) => {
                    if (trigger.match(/\s/)) {
                        logger.fatal(`${groupFile}/${commandFile}'s trigger, "${trigger}", contains whitespace`);
                        throw new Error();
                    }
                });

                Client.prototype.commands.forEach((commandArray) => {
                    if (commandArray.map((cmd) => cmd.name).includes(command.name)) {
                        logger.error(`${groupFile}/${commandFile}'s name, ${name}, already taken`);
                        throw new Error();
                    }

                    commandArray.map((cmd) => cmd.triggers).forEach((triggers) => {
                        triggers.forEach((trigger) => {
                            if (command.triggers.includes(trigger)) {
                                logger.error(`${groupFile}/${commandFile}'s trigger, ${trigger}, is already taken`);
                                throw new Error();
                            }
                        });
                    });
                });

                command.group = groupFile;
                command.file = `${groupFile}/${commandFile}`;

                if (!Client.prototype.commands.has(groupFile)) {
                    Client.prototype.commands.set(groupFile, []);
                }
                Client.prototype.commands.get(groupFile).push(command);

                logger.debug(`Command loaded: ${groupFile}/${command.name} - ${command.description}`);
            });
        });
        Client.prototype.getCommand = (commandToFind) => {
            let result = undefined;

            Client.prototype.commands.forEach((commands) => {
                if (result !== undefined) return;
                commands.forEach((command) => {
                    if (result !== undefined) return;
                    command.triggers.forEach((trigger) => {
                        if (result !== undefined) return;
                        if (trigger === commandToFind) {
                            result = command;
                        }
                    });
                });
            });
            return result;
        }
    } catch (ignored) {
        logger.fatal('Failed to setup the CommandHandler\n' + error.stack);
        return true;
    }

    logger.trace('Successfully setup the CommandHandler');


    Client.prototype.__listeners.push({
        event: 'message', function: (message) => {
            if (message.author.bot) return;
            //check read perms

            let client = message.client;

            // let prefix = message.guild
            //     ? message.guild.prefix || client.config.prefix
            //     : client.config.prefix;
           let prefix = message.guild
                ? message.guild.prefix || client.config.prefix
                : client.config.prefix;

let regex = new RegExp(`^(?:${prefix.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}|<@!?${client.user.id}>)\\s*(\\w+)(?:\\s+(.*))?`);     
            let content = message.content;
            let parts = content.match(regex);
            if (parts === null) return;

            let trigger = parts[1];
            let argument = parts[2] || '';

            Client.prototype.commands.forEach((commands) => {
                commands.forEach((command) => {
                    command.triggers.forEach((commandTrigger) => {
                        if (commandTrigger === trigger) {
                            runCommand(command, message, client, argument);
                        }
                    });
                });
            });
        }
    });
};

function runCommand(command, message, client, argument) {
    if (command.ownerOnly) {
        if (!client.config.owners.includes(message.author.id)) return;
        logger.info(`${command.name} command used by: ${message.author.tag} (${message.author.id})`);
    }

    if (message.guild) {
        // noinspection JSUnresolvedVariable
        if (command.botPerm && !message.guild.me.hasPermission(command.botPerm)) {
            message.channel.send("I don't not have permission to run this command");
            return;
        }
        // noinspection JSUnresolvedVariable
        if (command.userPerm && !message.member.hasPermission(command.userPerm)) {
            message.channel.send("You don't not have permission to run this command");
            return;
        }
    }


    try {
        command.run(message, client, argument)
    } catch (error) {
        message.channel.send(`Command failed to run: ${error}`);
        logger.error(` Command, ${command.name}, errored!\n${error.stack}`);
    }
}
