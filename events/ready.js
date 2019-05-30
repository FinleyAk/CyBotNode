const {Client} = require('discord.js');

module.exports = function ready() {
    Client.prototype.logger.info('Up and running');
    Client.prototype.logger.info(`Logged in as CyBot#9146`)
};

