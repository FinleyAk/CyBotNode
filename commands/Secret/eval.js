const log4js = require('log4js');
const logger = log4js.getLogger('Eval');
// noinspection JSUnusedLocalSymbols
const Discord = require("discord.js");
const mem = new Map();
const haste = require('easy-hastebin');
const crypto = require("crypto");


module.exports = {
    "name": "Eval",
    "triggers": ['eval'],
    "description": "Evaluate inputted code",
    "ownerOnly": true,
    "run": function run(message, client, argument) {
        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);
        function clean(text) {
            if (typeof(text) === "string")
              return text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }
        
        console.log(`\n${message.author.username}#${message.author.discriminator} Used Eval Command On ${message.guild.name}`)
          let argresult = args.join(' ');
    
              if (!argresult) {
                return message.channel.send("Please provide some ***code*** to run");
              }
        
              try {
        
                var evaled = eval(argresult);
        
                if (typeof evaled !== "string")
               evaled = require("util").inspect(evaled);
               if (evaled.includes(client.token)) {
                  console.log(`\n${message.author.username}#${message.author.discriminator} Try To Get The client Token On ${message.guild.name} (ServerID: ${message.guild.id}).\n`)
                 message.channel.send("You are not permited to use this command.");
                }
        
              } catch (err){
          haste(clean(err)).then(res => message.channel.send('**The code you tried to run returned with an error!** ' + res));
          }


                

              }
            }
   