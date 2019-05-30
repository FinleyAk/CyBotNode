const discord = require('discord.js');
module.exports = {
    "name": "Ping",
    "triggers": ['ping'],
    "description": "Shows the latency of the bot",
    "ownerOnly": false,
    "run": async function run(message, client) {
                const m = await message.channel.send(`Pinging... Please hold!`);
                m.delete();

           const ping = new discord.RichEmbed()
        .addField(`:hourglass: Latency:`, `${m.createdTimestamp - message.createdTimestamp}ms`, true)
        .addField(`:heartbeat: API latency is:`, `${Math.round(client.ping)}ms`, true);

        message.channel.send({ embed:ping })



    }
};
