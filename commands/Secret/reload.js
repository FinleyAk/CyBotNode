module.exports = {
    "name": "Reload",
    "triggers": ['reload'],
    "description": "Reload",
    "ownerOnly": false,
    "run": function run(message, client, argument) {
        if (!argument) return message.reply("Must provide a command name to reload.");
        let command = client.getCommand(argument);

        if (command === undefined) {
            message.channel.send("Unabled to find command");
            return;
        }

        let commandPath = `../${command.file}`;
        delete require.cache[require.resolve(commandPath)];

        let newCommand = require(commandPath);
        newCommand.group = command.group;
        newCommand.file = command.file;

        let newCommands = [];
        client.commands.get(command.group).forEach((cmd) => {
            if (cmd.name === command.name) {
                newCommands.push(newCommand);
            } else {
                newCommands.push(cmd);
            }
        });
        client.commands.set(command.group, newCommands);

        message.reply(`The command ${argument} has been reloaded`);
    }
};
