const Discord = require('discord.js')
var fs = require('fs');

module.exports = (msg,client) =>{

    //---------------------考試選擇-----------------------

    function select_exam(msg,e_arr,cmd_msg_id,last_msg_id)
    {
        var del_flag=0;
        msg.channel.awaitMessages(a_msg=>a_msg.content.toLocaleLowerCase().startsWith("s ")&&a_msg.author.id==msg.author.id,{maxMatches: 1,time:60*1000}).then(function(a_msg){
            if(Number(a_msg.first().content.substr(2))>e_arr.length)
            {
                var embed=new Discord.RichEmbed();
                var title_emojis=["608629862252412928","608618455905599488"];
                str="沒有這個考試編號";
                embed.addField(`${emoji(title_emojis[Math.floor(Math.random()*2)])}`+str,"請重新輸入",true);
                embed.setColor(0xFF0000);
                msg.channel.send({embed});
                select_exa(msg,e_arr,cmd_msg_id,last_msg_id);
                del_flag=1;
            }
            else
            {
                var embed=new Discord.RichEmbed();
                e_arr=e_arr[Number(a_msg.first().content.substr(2))-1].split(",");
                e_arr[e_arr.length-1]=e_arr[e_arr.length-1].replace(/ /gi,'\n');
                var date=e_arr[1].split(".");
                var date_str=(Number(date[0])+1)+"月"+date[1];
                for(var i=2;i<date.length;++i)
                {
                    date_str+=(i==date.length-1?"和":"，")+(Number(date[0])+1)+"月"+date[i]
                }
                var nd = new Date();
                var gd = new Date();
                nd.setHours(nd.getUTCHours()+8);
                gd.setMonth(date[0]);
                gd.setDate(date[1].split("日")[0]);
                gd.setHours(0);
                gd.setMinutes(0);
                gd.setSeconds(0);
                if(gd.getTime()-nd.getTime()>=24*60*60*1000)
                {
                    var days= Math.floor((gd.getTime()-nd.getTime())/(24*60*60*1000));
                    embed.setColor(0x00FFCC);
                    embed.addField("**"+e_arr[0]+"的日期是"+date_str+"**","**距離"+e_arr[0]+"還有"+days+"天**",false);
                    embed.addField("**範圍**:",e_arr[e_arr.length-1],false);
                    msg.channel.send({embed});
                }
                else if(gd.getTime()-nd.getTime()<24*60*60*1000&&gd.getTime()-nd.getTime()>0)
                {
                    embed.setColor(0x00FFCC);
                    embed.addField("**"+e_arr[0]+"的日期是"+date_str+"**","**距離"+e_arr[0]+"剩不到1天**",false);
                    embed.addField("**範圍**:",e_arr[e_arr.length-1],false);
                    msg.channel.send({embed});
                }
                else if(gd.getTime()-nd.getTime()<=0&&(nd.getTime()-gd.getTime())/(24*60*60*1000)<=date.length-1)
                {
                    var days = Math.floor((nd.getTime()-gd.getTime())/(24*60*60*1000));
                    var tt;
                    fs.readFile("./data/today_exam.txt", function (err, data) {
                        if (err) throw err;
                        tt=data.toString().substr(5);
                        embed.setColor(0x00FFCC);
                        embed.addField("**"+e_arr[0]+"是今天**","你還有"+(date.length-days-1)+"天要考",false);
                        embed.addField("**範圍:**",tt,false);
                        msg.channel.send({embed});
                    });
                }
                del_flag=1;
            }
        });
        client.setTimeout(function(){
            if(!del_flag)
            {
                msg.channel.fetchMessage(cmd_msg_id).then(d_msg=>d_msg.delete());
                msg.channel.fetchMessage(last_msg_id).then(d_msg=>d_msg.delete());
            }
        },60*1000);
    }

    if(msg.content.toLocaleLowerCase()=="ed")
    {
        var cmd_msg_id=msg.id;
        var embed = new Discord.RichEmbed();
        fs.readFile("./data/重要考試.txt", function (err, data) {
            if (err) throw err;
            str=data.toString().split("\n");
            var embed_content="";
            for(var i=0;i<str.length-1;++i)
            {
                embed_content+=(i+1)+". "+str[i].split(",")[0]+"\n";
            }
            embed_content+="\n\n請輸入s <你要查的考試編號>\n請在1分鐘內選擇你要查的考試";
            embed.addField("**即將到來的重要考試有.....**",embed_content,false);
            embed.setColor(0x0066FF);
            msg.channel.send({embed}).then(last_msg=>{
                select_exam(msg,str,cmd_msg_id,last_msg.id);
            });
        });
    }
};
