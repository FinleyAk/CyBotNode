const discord = require('discord.js');
const db = require("quick.db");
module.exports = {
    "name": "Modules",
    "triggers": ['modules'],
    "description": "Check what modules you have turned on",
    "ownerOnly": false,
    "run": async function run(message, client) {

        var modules = new db.table('modules');
        modules.set(`moderation_${message.guild.id}`, `false`)







    }
};