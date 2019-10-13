const Discord = require('discord.js')

module.exports = (msg,client) =>{

    function emoji(e_id)
    {
        const e = client.emojis.find(emoji => emoji.id === e_id)
        return e;
    }

    if(msg.content.toLocaleLowerCase().startsWith("wf"))
    {
        var cmd=msg.content.substr(3);
        var myserver = client.channels.get("612180981172142090");
        const collector = new Discord.MessageCollector(myserver,m=>m.author.id=="134073775925886976",{maxMatches: 1,time:30*1000});
        myserver.send("=tex "+cmd);
        collector.on('collect',c_msg=>{
            if(c_msg.content.includes("Rendering failed. Check your code."))
            {
                const embed = new Discord.RichEmbed();
                var title_emojis=["608629862252412928","608618455905599488"];
                embed.addField(`${emoji(title_emojis[Math.floor(Math.random()*2)])}`+"**latex語法錯誤**","關於latex的語法請參考[這篇文章](https://walkccc.github.io/blog/2018/02/17/Techniques/latex-syntax/)",true);
                embed.setColor(0xFF0000);
                msg.channel.send({embed})
            }
            else
            {
                var Attachment = (c_msg.attachments).array();
                Attachment.forEach(function(e){
                    msg.channel.send({files:[e.url]});
                });
            }
        });
    }
};
