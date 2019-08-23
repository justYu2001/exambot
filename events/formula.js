const Discord = require('discord.js')
var fs = require('fs');

module.exports = (msg,client) =>{

//--------------------------------表情符號-----------------------------

    function emoji(e_id)
    {
        const e = client.emojis.find(emoji => emoji.id === e_id)
        return e;
    }
//--------------------------------公式選擇----------------------------

    function select_formula(msg,f_arr,cmd_msg_id,last_msg_id)
    {
        var del_flag=0;
        msg.channel.awaitMessages(a_msg=>a_msg.content.toLocaleLowerCase().startsWith("s ")&&a_msg.author.id==msg.author.id,{maxMatches: 1,time:3*60*1000}).then(function(a_msg){
            if(Number(a_msg.first().content.substr(2))>f_arr.length)
            {
                var embed=new Discord.RichEmbed();
                var title_emojis=["608629862252412928","608618455905599488"];
                str="沒有這個公式編號";
                embed.addField(`${emoji(title_emojis[Math.floor(Math.random()*2)])}`+str,"請重新輸入",true);
                embed.setColor(0xFF0000);
                msg.channel.send({embed});
                select_formula(msg,f_arr,cmd_msg_id,last_msg_id);
                del_flag=1;
            }
            else
            {
                var f_url=f_arr[Number(a_msg.first().content.substr(2))-1].split(",")[1];
                msg.channel.send({files:[(f_url[f_url.length-1]!='g'?f_url.substring(0,f_url.length-1):f_url)]});
                del_flag=1;
            }
        });
        client.setTimeout(function(){
            if(!del_flag)
            {
                msg.channel.fetchMessage(cmd_msg_id).then(d_msg=>d_msg.delete());
                msg.channel.fetchMessage(last_msg_id).then(d_msg=>d_msg.delete());
            }
        },3*60*1000);
    }

    if(msg.content.toLocaleLowerCase().startsWith("fom"))
    {
        var cmd_msg_id=msg.id;
        var str;
        var embed = new Discord.RichEmbed();
        fs.readFile("./data/公式.txt", function (err, data) {
            if (err) throw err;
            str=data.toString().split("\n");
            var title,f="";
            for(var i=0;i<str.length;++i)
            {
                if(!str[i].includes(","))
                {
                    if(i)
                    {
                        embed.addField(title,f,false);
                        title=str[i];
                        str.splice(i,1);
                        --i;
                        f="";
                    }
                    else
                    {
                        title=str[i];
                        str.splice(i,1);
                        i--;
                    }
                }
                else
                {
                    f+=(i+1)+". "+str[i].split(",")[0]+"\n";
                }
            }
            embed.addField(title,f+"\n\n請輸入s <你要的公式編號>\n請在3分鐘內選擇你要的公式",false);
            embed.setColor(0x00DD77);
            msg.channel.send({embed}).then(last_msg=>{
                select_formula(msg,str,cmd_msg_id,last_msg.id);
            });
        });
    }
};