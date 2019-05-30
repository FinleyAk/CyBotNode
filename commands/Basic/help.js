const discord = require('discord.js');

module.exports = {
    "name": "Help",
    "triggers": ['help'],
    "description": "Shows this message",
    "ownerOnly": false,
    "run": function run(message, client){
        let embed = new discord.RichEmbed();
        client.commands.forEach((commands, group) => {
            embed.addField(group, commands.map((command) => `\`${command.name}\` -> ${command.description}`).join('\n'))
            embed.setColor("#36393E");
            embed.setTimestamp()
        });
        message.channel.send({embed});

    }
}
