const Discord = require('discord.js')

module.exports = (msg,client) =>{

    if(msg.content.toLocaleLowerCase().startsWith("calc"))
    {
        var cmd=msg.content.substr(5);
        var myserver = client.channels.get("612180981172142090");
        const collector = new Discord.MessageCollector(myserver,m=>m.author.id=="134073775925886976",{time:30*1000});
        myserver.send("=wolf "+cmd);
        collector.on('collect',c_msg=>{
            if(c_msg.content.includes("Wolfram|Alpha didn't send a result back."))
            {
                msg.channel.send("指令錯誤，請重新輸入");
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