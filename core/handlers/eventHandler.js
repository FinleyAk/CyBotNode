const fs = require('fs');
const log4js = require('log4js');
const {Client} = require('discord.js');

/**
 * @return {boolean}
 */
module.exports = function constructor() {
    const logger = log4js.getLogger("EventHandler");
    logger.trace('Setting up EventHandler...');

    let listeners = [];
    Client.prototype.__listeners = listeners;

    let eventFiles = fs.readdirSync('./events');
    try {
        eventFiles.forEach((eventFile) => {
            let eventStat = fs.statSync(`./events/${eventFile}`);

            if (!eventStat.isFile()) {
                logger.warn(`${eventFile} is not a file`);
                return;
            }

            if (!eventFile.endsWith('.js')) {
                logger.warn(`${eventFile} is not a javascript file`);
                return;
            }
            let eventPath = `../../events/${eventFile}`;
            let eventName = eventFile.substring(0, eventFile.length - 3);
            let event;
            try {
                event = require(eventPath);
                delete require.cache[require.resolve(eventPath)];
            } catch (error) {
                logger.fatal("Error while creating event!\n" + error.stack);
                throw new Error();
            }
            listeners.push({
                event: eventName, function: (...args) => {
                    try {
                        event(args);
                    } catch (error) {
                        logger.error(`${eventName} threw an error!\n${error.stack}`);
                    }
                }
            });
            logger.debug(`Event loaded: ${eventName}`);
        });
    } catch (error) {
        logger.fatal('Failed to setup the EventHandler\n' + error.stack);
        return true;
    }
    logger.trace('Successfully setup the EventHandler');
};