const Discord = require('discord.js')
var fs = require('fs');
var request = require("request");
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN)
//'NTk0NzE5Mjc5NjczMzc2Nzgw.XRjDOA.SwrA-g8TxfwFeUsoeZz9wkOGmZM'

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('message', msg => {
    if(msg.author==client.user)
    {
        return;
    }
    if (msg.content.substring(0, 1) === '!')
    {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch(cmd) 
        {
            case 'ping':
                msg.reply('Pong!');
            break;
         }
     }
  });
