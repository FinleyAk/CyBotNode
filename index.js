const configBuilder = require('./core/config/configBuilder.js');
const commandHandler = require('./core/handlers/commandHandler.js');
const eventHandler = require('./core/handlers/eventHandler.js');
const discord = require('discord.js');
const hastebin = require('./core/hastebin.js');
const log4js = require('log4js');
const mysql = require("mysql");
const client = new discord.Client();

function main() {
    configureLogging();

    if (setupConfig() ||
        hastebin() ||
        eventHandler() ||
        commandHandler()
    ) return;

    let client = new discord.Client();
    client.__listeners.forEach(listener => client.on(listener.event, listener.function));
    client.__listeners = undefined;
    delete client.__listeners;
    client.login(client.config.token);


    client.on("ready", () => {
        client.user.setPresence({
            status: "online",
            game: {
                name: "Anime",
                type: 'WATCHING'
            }
        });
    })

    var con = mysql.createConnection({
        host: `${config.dbuser}`
    })

}

function configureLogging() {
    log4js.configure(require('./logConfig.js'));

    let logger = discord.Client.prototype.logger = log4js.getLogger('Main');

    logger.trace('Logger successfully setup');
}

function setupConfig() {
    let logger = discord.Client.prototype.logger;
    logger.trace('Setting up Config...');

    const config = discord.Client.prototype.config = configBuilder();

    if (config === undefined) {
        logger.warn('No config.json found!');
        logger.info('Created a new config.json');
        return true;
    }
    if (config === null) {
        logger.fatal('Invalid config.json!');
        logger.info('Please delete/move/rename file to regenerate a template');
        return true;
    }

    logger.trace('Successfully setup the Config');

    return false;
}






main();
