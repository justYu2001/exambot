const Discord = require('discord.js')

module.exports = (msg,client) =>{

//----------------------------------表情符號--------------------------------

    function emoji(e_id)
    {
        const e = client.emojis.find(emoji => emoji.id === e_id)
        return e;
    }

    if(msg.content.toLocaleLowerCase().startsWith("calc"))
    {
        var cmd=msg.content.substr(5);
        var myserver = client.channels.get("612180981172142090");
        const collector = new Discord.MessageCollector(myserver,m=>m.author.id=="134073775925886976",{time:30*1000});
        myserver.send("=wolf "+cmd);
        collector.on('collect',c_msg=>{
            if(c_msg.content.includes("Wolfram|Alpha didn't send a result back."))
            {
                var embed=new Discord.RichEmbed();
                var title_emojis=["608629862252412928","608618455905599488"];
                embed.addField(`${emoji(title_emojis[Math.floor(Math.random()*2)])}`+"**指令錯誤，請重新輸入**","對指令不熟嗎?\n輸入 `shm calc`\n我會傳指令說明給你",true);
                embed.setColor(0xFF0000);
                msg.channel.send({embed});
            }
            else
            {
                var Attachment = (c_msg.attachments).array();
                Attachment.forEach(function(e){
                    msg.channel.send({files:[e.url]});
                });
            }
            if(c_msg.embeds.length)
            {
                collector.stop();
            }
        });
    }
};