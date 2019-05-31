const discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    "name": "Modmodule",
    "triggers": ['modmodule'],
    "description": "Turn the moderation module on/off",
    "ownerOnly": false,
    "run": async function run(message, client) {

        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);

        if (args == "on") {
            db.set(`moderation_${message.guild.id}`, `true`);
            var modon = db.get(`moderation_${message.guild.id}`);
            message.channel.send(`${args}`)
            message.channel.send(`Moderation module is now ${modon}`);
        }
        if (args == "off") {
            db.set(`moderation_${message.guild.id}`, `false`)
            var modoff = db.get(`moderation_${message.guild.id}`);
            message.channel.send(`${args}`)
            message.channel.send(`Moderation module is now ${modoff}`);
        }
    }
};