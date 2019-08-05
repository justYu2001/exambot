const Discord = require('discord.js')
var fs = require('fs');
var request = require("request");
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN)
//process.env.BOT_TOKEN'

function emoji(e_id)
{
    const e = client.emojis.find(emoji => emoji.id === e_id)
    return e;
}

function get_current_time()
{
    var today = new Date();
    //today.getFullYear()+"/"+today.getUTCMonth()+"/"+today.getDay()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
    var current_time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    return current_time;
}

//---------------------公式圖片----------------------
function formula_img(src,msg)
{
        var writeStream = fs.createWriteStream('image.png');
        var readStream = request(src)
        readStream.pipe(writeStream);
        readStream.on('end', function() {
            console.log('文件下載成功');
        });
        readStream.on('error', function() {
            console.log("錯誤:" + err)
        })
        writeStream.on("finish", function() {
            console.log("文件寫入成功");
            writeStream.end();
            msg.channel.send({files:["./image.png"]});
        });    
}

//---------------------公式----------------------
function return_formula(str,msg)
{
    if(str=="歐姆定律")
    {
        var url = "https://latex.codecogs.com/png.latex?"+"\\"+"dpi{300}&space;"+"\\"+"bg_white&space;V=IR";
        formula_img(url,msg);
    }
    if(str=="庫倫定律")
    {
        var url = "https://latex.codecogs.com/png.latex?"+"\\"+"dpi{300}&space;"+"\\"+"bg_white&space;F=K"+"\\"+"times"+"\\"+"dfrac{Q_1"+"\\"+"times Q_2}{"+"\\"+"varepsilon_rR^2}";
        formula_img(url,msg);
        url = "https://latex.codecogs.com/png.latex?"+"\\"+"dpi{300}&space;"+"\\"+"bg_white&space;K=9"+"\\"+"times"+"10^9";
        formula_img(url,msg);
        msg.channel.sendMessage("相對介質系數ε題目沒給就為1，在空氣中也是");
    }
    if(str=="K常數")
    {
        url = "https://latex.codecogs.com/png.latex?"+"\\"+"dpi{300}&space;"+"\\"+"bg_white&space;K="+"\\"+"times"+"10^9";
        formula_img(url,msg);
    }
    if(str=="電功率")
    {
        url = "https://latex.codecogs.com/png.latex?"+"\\"+"dpi{300}&space;"+"\\"+"bg_white&space;P=IV=I^2R="+"\\"+"dfrac{V^2}{R}";
        formula_img(url,msg);
    }
    if(str=="電能")
    {
        url = "https://latex.codecogs.com/png.latex?"+"\\"+"dpi{300}&space;"+"\\"+"bg_white&space;W=Pt";
        formula_img(url,msg);
    }
    if(str=="馬力")
    {
        url = "https://latex.codecogs.com/png.latex?"+"\\"+"dpi{300}&space;"+"\\"+"bg_white&space;1HP=746W";
        formula_img(url,msg);
    }
    if(str=="電子的電量")
    {
        url = "https://latex.codecogs.com/png.latex?"+"\\"+"dpi{300}&space;"+"\\"+"bg_white&space;e=-1.602"+"\\"+"times10^{-19}C";
        formula_img(url,msg);
    }
}
var gc;

var gd = new Date();
gd.setFullYear(2020);
gd.setMonth(4);
gd.setDate(2);
gd.setHours(0);
gd.setMinutes(0);
gd.setSeconds(0);

function game_activity()
{
    var nd = new Date();
    var time=gd.getTime()-(nd.getTime()+8*60*60*1000);
    var d = parseInt(time/(24*60*60*1000));
    var h = parseInt(time%(24*60*60*1000)/60/60/1000);
    var m = parseInt((time%(24*60*60*1000)%(60*60*1000))/60/1000);/*
    var s = parseInt(time%(24*60*60*1000)%(60*60*1000)%(60*1000)/1000);*/
    client.user.setActivity("統測倒數"+d+"天"+h+"時"+m+"分", {type: "PLAYING"});
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(get_current_time());
    client.setInterval(function(){
        game_activity();
    },1000);
    
    var c = client.channels.get("593050699705614338");
    c.send(`${emoji("501700003233005579")}`);
    client.setInterval(function(){
            var now_time = new Date();
            if(now_time.getUTCHours()+8==20&&now_time.getUTCMinutes()==0&&now_time.getUTCSeconds()==0)
            {
                var emojis_list=["604532826649526322","604532855938482176","501699773481484288","607826081440858132"];
                fs.open('exam.txt', 'r', function (err, fd) {
 
                    if (err) {
                        return console.error(err);
                    }
                 
                    var buffr = new Buffer(1024);
                 
                    fs.read(fd, buffr, 0, buffr.length, 0, function (err, bytes) {
                 
                        if (err) throw err;
                 
                        // Print only read bytes to avoid junk.
                        if (bytes > 0) {
                            var PSC = client.channels.get("450975130387218457");   //資甲弱智區區
                            console.log(buffr.slice(0, bytes).toString());
                            PSC.send("<@&593404925753688064>\n"+buffr.slice(0, bytes).toString()+"\n祝大家明天都能屌虐"+`${emoji(emojis_list[Math.floor(Math.random()*4)])}`);
                        }
                 
                        // Close the opened file.
                        fs.close(fd, function (err) {
                            if (err) throw err;
                        });
                    });
                })
            }
        },1000);
  });

client.on('message', msg => {
    if(msg.author==client.user)
    {
        return;
    }
    if (msg.content.substring(0, 1) === '!') {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                msg.reply('Pong!');
            break;
         }
     }
     if(msg.content.startsWith("<@!594719279673376780>")||msg.content.startsWith("<@594719279673376780>"))
     {
        let fullCommand = msg.content.substr(21)
        let splitCommand = fullCommand.split(" ")
        let primaryCommand = splitCommand[1] 
        if(primaryCommand=="提醒我")
        {/*
            var by = splitCommand[2]>=today.getFullYear().toString();
            var bmonth = splitCommand[3]>=today.getMonth().toString();
            var bd = splitCommand[4]>=today.getDate().toString();*/
            var nt = new Date();
            var bh = Number(splitCommand[2])<=23;
            var bmin = Number(splitCommand[3])<=59;
            var h = (nt.getUTCHours()+8>24?nt.getUTCHours()+8-24:nt.getUTCHours()+8);
            var now_time = h*60*60*1000+nt.getMinutes()*60*1000+nt.getSeconds()*1000;
            console.log(h+":"+nt.getMinutes()+":"+nt.getSeconds());
            var return_time =  Number(splitCommand[2])*60*60*1000+Number(splitCommand[3])*60*1000;
            return_time-=now_time;
            if(bh&&bmin&&(return_time>0))
            {
                client.setTimeout(function(){
                    msg.channel.send(msg.author+"要"+splitCommand[splitCommand.length-1]+"了");
                },return_time);
                if(splitCommand[3].length<2)
                {
                    splitCommand[3] = "0"+splitCommand[3];
                }
                msg.channel.sendMessage("好!我會在"+splitCommand[2]+":"+splitCommand[3]+"提醒"+msg.author+"要"+splitCommand[splitCommand.length-1]);
            }
            else
            {
                msg.channel.sendMessage(msg.author+"時間格式錯誤，請重新輸入");
            }
        }
        if(primaryCommand == "公式")
        {
            return_formula(splitCommand[2],msg);
        }
        if(primaryCommand == "寫公式")
        {
            var myserver = client.channels.get("593050699705614338");
            myserver.sendMessage("=tex "+fullCommand.substr(5));
            gc = msg;
        }
        if(primaryCommand == "算")
        {
            var myserver = client.channels.get("593050699705614338");
            myserver.sendMessage("=wolf "+fullCommand.substr(3));
            gc = msg;
        }
        if(primaryCommand == "因式分解")
        {
            var myserver = client.channels.get("593050699705614338");
            myserver.sendMessage("=wolf factor "+fullCommand.substr(6));
            gc = msg;
        }
        if(primaryCommand == "今天考什麼")
        {
            var t = new Date();
            t.setHours(t.getUTCHours()+8);
            if(((t.getDate()==1||t.getDate()==2||t.getDate()==5)&&t.getHours()>=12)||((t.getDate()==3||t.getDate()==4)&&t.getHours()>=17))
            {
                msg.channel.send("放學了啦");
            }
            else
            {
                fs.open('exam.txt', 'r', function (err, fd) {
 
                    if (err) {
                        return console.error(err);
                    }
                 
                    var buffr = new Buffer(1024);
                 
                    fs.read(fd, buffr, 0, buffr.length, 0, function (err, bytes) 
                    {
                        console.log(bytes);
                        if (err)
                        {
                            throw err;
                        } 
                 
                        // Print only read bytes to avoid junk.
                        if (bytes > 5) {
                            msg.channel.send(buffr.slice(0, bytes).toString().substr(5));
                        }
                        else
                        {
                            msg.channel.send("今天沒有考試");
                        }
                 
                        // Close the opened file.
                        fs.close(fd, function (err) {
                            if (err) throw err;
                        });
                    });
                })
            }
        }
     }
    if(msg.content.includes("垃圾廣告")&&msg.author.id!="554654697261105180")
    {
        msg.channel.sendMessage(msg.author+"我不會再發垃圾廣告了啦幹")
    }
    if(msg.author.id =="134073775925886976"&&msg.channel.id=="593050699705614338")
    {
        if(msg.content.includes("Wolfram|Alpha didn't send a result back."))
        {
            gc.channel.send("指令錯誤，請重新輸入");
        }
        else
        {
            var Attachment = (msg.attachments).array();
            Attachment.forEach(function(e){
                gc.channel.send({files:[e.url]});
            });
        }
    }
    if(msg.content.startsWith("re"))
    {
        let str = msg.content.split(" ");
        var c = client.channels.get(str[5]);
        var gt = new Date();
        gt.setFullYear(Number(str[1]));
        gt.setMonth(Number(str[2])-1);
        gt.setDate(Number(str[3]));
        gt.setHours(Number(str[4]));
        gt.setMinutes(12);
        gt.setSeconds(0);
        var nt = new Date();
        console.log(nt.getHours()+":"+nt.getMinutes()+":"+nt.getSeconds());
        console.log(gt.getHours()+":"+gt.getMinutes()+":"+gt.getSeconds());
        var time=gt.getTime()-(nt.getTime()+8*60*60*1000);
        console.log(time);
        client.setTimeout(function(){
            c.send(str[6]);
        },time);

    }
  });
