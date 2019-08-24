const Discord = require('discord.js')

module.exports = (msg,client) =>{

//----------------------------------表情符號--------------------------------

    function emoji(e_id)
    {
        const e = client.emojis.find(emoji => emoji.id === e_id)
        return e;
    }

    var cmd_arr=["ed","wf","calc","fac","wtt","dic"];
    if(msg.content.toLocaleLowerCase()=="shm")
    {
        var embed = new Discord.RichEmbed();
        embed.setColor(0x00FF00);
        embed.addField("**指令說明**","只需要在`shm`後面加上指令編號或該指令就可以查詢\nEX: `shm 1` 或 `shm ed`");
        embed.addField("**1 . ed**","查詢重要考試(段考、模考...等)的日期與考試範圍");
        embed.addField("**2 . wf**","幫你寫公式");
        embed.addField("**3 . calc**","屌虐你數學");
        embed.addField("**4 . fac**","因式分解");
        embed.addField("**5 . fom**","背公式屌虐你");
        embed.addField("**6 . wtt**","查今天有什麼考試");
        embed.addField("**7 . dic**","查單字");
        msg.author.send({embed});
        if(msg.channel.toString()!=msg.author.toString())
        {
            msg.channel.send("好喔!我已經把指令說明寄給你了");
        }
    }
    if(msg.content.toLocaleLowerCase()=="shm 1"||msg.content.toLocaleLowerCase()=="shm ed")
    {
        var embed = new Discord.RichEmbed();
        embed.setColor(0x00FF00);
        embed.addField("**指令說明 | ed**","輸入 `ed` 後，會列出即將到來的重要考試(段考、模考......等)\n再輸入 `s <你要查的考試編號>`  我就會告訴你該考試的日期與考試範圍\n```cs\n#注意:輸入 ed 後你必須在 1 分鐘內完成查詢\n```",false);
        msg.author.send({embed});
        if(msg.channel.toString()!=msg.author.toString())
        {
            msg.channel.send("好喔!我已經把指令說明寄給你了");
        }
    }
    if(msg.content.toLocaleLowerCase()=="shm 2"||msg.content.toLocaleLowerCase()=="shm wf")
    {
        var embed = new Discord.RichEmbed();
        embed.setColor(0x00FF00);
        embed.addField("**指令說明 | wf**","輸入 `wf` + 你想要的公式(要用latex語法)\n我就會幫你寫你要的公式\n關於latex語法請參考[這篇文章](https://walkccc.github.io/blog/2018/02/17/Techniques/latex-syntax/)",false);
        msg.author.send({embed});
        if(msg.channel.toString()!=msg.author.toString())
        {
            msg.channel.send("好喔!我已經把指令說明寄給你了");
        }
    }
    if(msg.content.toLocaleLowerCase()=="shm 3"||msg.content.toLocaleLowerCase()=="shm calc")
    {
        var embed = new Discord.RichEmbed();
        embed.setColor(0x00FF00);
        embed.addField("**指令說明 | calc**","輸入 `calc` + 你想算的數學式\n我就會幫你算出來\n大部分的數學式用latex語法輸入即可，關於latex語法請參考[這篇文章](https://walkccc.github.io/blog/2018/02/17/Techniques/latex-syntax/)\n以下是一些特例```\n微分:calc d/dx <你要微分的數學式>\n三角函數:直接打三角函數+角度\nEX:calc sin15\n行列式:\nEX:\n如果要算\n|1 2|\n|3 4|\n輸入 calc {{1, 2}, {3, 4}}\n```",false);
        msg.author.send({embed});
        if(msg.channel.toString()!=msg.author.toString())
        {
            msg.channel.send("好喔!我已經把指令說明寄給你了");
        }
    }
    if(msg.content.toLocaleLowerCase()=="shm 4"||msg.content.toLocaleLowerCase()=="shm fac")
    {
        var embed = new Discord.RichEmbed();
        embed.setColor(0x00FF00);
        embed.addField("**指令說明 | fac**","輸入 `fac` + 你想要因式分解的數學式(要用latex語法)\n我就會幫你因式分解\n關於latex語法請參考[這篇文章](https://walkccc.github.io/blog/2018/02/17/Techniques/latex-syntax/)",false);
        msg.author.send({embed});
        if(msg.channel.toString()!=msg.author.toString())
        {
            msg.channel.send("好喔!我已經把指令說明寄給你了");
        }
    }
    if(msg.content.toLocaleLowerCase()=="shm 5"||msg.content.toLocaleLowerCase()=="shm fom")
    {
        var embed = new Discord.RichEmbed();
        embed.setColor(0x00FF00);
        embed.addField("**指令說明 | fom**","輸入 `fom` 後，會列出我知道的公式(有數學、基電、電子學、數邏四科)\n再輸入 `s <你要查的公式編號>`  我就會告訴你該公式\n```cs\n#注意:輸入 fom 後你必須在 3 分鐘內完成查詢\n```",false);
        msg.author.send({embed});
        if(msg.channel.toString()!=msg.author.toString())
        {
            msg.channel.send("好喔!我已經把指令說明寄給你了");
        }
    }
    if(msg.content.toLocaleLowerCase()=="shm 6"||msg.content.toLocaleLowerCase()=="shm wtt")
    {
        var embed = new Discord.RichEmbed();
        embed.setColor(0x00FF00);
        embed.addField("**指令說明 | wtt**","輸入 `wtt` 後，我會告訴你今天有哪些考試",false);
        msg.author.send({embed});
        if(msg.channel.toString()!=msg.author.toString())
        {
            msg.channel.send("好喔!我已經把指令說明寄給你了");
        }
    }
    if(msg.content.toLocaleLowerCase()=="shm 7"||msg.content.toLocaleLowerCase()=="shm dic")
    {
        var embed = new Discord.RichEmbed();
        embed.setColor(0x00FF00);
        embed.addField("**指令說明 | dic**","輸入 `dic <你要查的英文單字/片語>`，即可查詢你要的英文單字/片語",false);
        msg.author.send({embed});
        if(msg.channel.toString()!=msg.author.toString())
        {
            msg.channel.send("好喔!我已經把指令說明寄給你了");
        }
    }
    if(msg.content.toLocaleLowerCase().startsWith("shm ")&&msg.content.split(" ").length<3)
    {

        if(Number(msg.content.substr(4))>7||(!cmd_arr.includes(msg.content.substr(4))&&isNaN(Number(msg.content.substr(4)))))
        {
            var embed=new Discord.RichEmbed();
            var title_emojis=["608629862252412928","608618455905599488"];
            embed.addField(`${emoji(title_emojis[Math.floor(Math.random()*2)])}`+"**指令錯誤，請重新輸入**","對指令不熟嗎?\n輸入 `shm`\n我會傳指令說明給你",true);
            embed.setColor(0xFF0000);
            msg.channel.send({embed});
        }
    }
};