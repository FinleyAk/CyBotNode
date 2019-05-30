// noinspection NpmUsedModulesInstalled
const request = require('snekfetch');
const {Client} = require('discord.js');

module.exports = function constructor() {
    Client.prototype.logger.trace('Setting up HasteBin...');
    Client.prototype.haste = async function (message) {
        let response = (await request.post('https://rythm.online/documents')
            .send(message)).body;

        if (response === null || response === undefined) {
            return null;
        }

        return response.key ? 'https://rythm.online/' + response.key : null;
    };
    Client.prototype.logger.trace('Successfully setup the HasteBin');
};
