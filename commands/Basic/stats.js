const Discord = require('discord.js');
module.exports = {
    "name": "Stats",
    "triggers": ['stats'],
    "description": "Shows the stats of the client",
    "ownerOnly": false,
    "run": function run(message, client){
const {
    version
} = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")


    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const embedStats = new Discord.RichEmbed()
            .setTitle("**CyBot Statistics**")
            .setColor("#36393E")
            .addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("• Users", `${client.users.size.toLocaleString()}`, true)
            .addField("• Servers", `${client.guilds.size.toLocaleString()}`, true)
            .addField("• Channels ", `${client.channels.size.toLocaleString()}`, true)
            .addField("• Discord.js", `v${version}`, true)
            .addField("• Node", `${process.version}`, true)
            .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("• CPU usage", `\`${percent.toFixed(2)}%\``, true)
            .addField("• Arch", `\`${os.arch()}\``, true)
            .addField("• Platform", `\`\`${os.platform()}\`\``, true)
        message.channel.send(embedStats)
    });

}
};
