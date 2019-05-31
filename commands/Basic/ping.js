const discord = require('discord.js');
module.exports = {
    "name": "Ping",
    "triggers": ['ping'],
    "description": "Shows the latency of the bot",
    "ownerOnly": false,
    "run": async function run(message, client) {
        const m = await message.channel.send(`Pinging... Please hold!`).then((msg) => {
            const ping = new discord.RichEmbed()
                .addField(`:hourglass:`, `${msg.createdTimestamp - message.createdTimestamp}ms`, false)
                .addField(`:heartbeat:`, `${Math.round(client.ping)}ms`, false);
            msg.edit({ embed: ping })
        });
    }
};