const Discord = require('discord.js')
var fs = require('fs');
var request = require("request");
const client = new Discord.Client();
const ping = require("./events/ping.js");
const exam_date = require("./events/exam_date.js");
const write_formula = require("./events/write_formula.js");
const calculate = require("./events/calculate.js");
const factor = require("./events/factor.js");
const formula = require("./events/formula.js");
const test_today = require("./events/test_today.js");
const look_up_the_dictionary = require("./events/look_up_the_dictionary.js");
const token = require("./token.js");
client.login(token);

//-----------------表情符號------------------------

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
    var c = client.channels.get("612180981172142090");
    c.send({files:["https://i.imgur.com/ogbcvHB.png"]});

    client.setInterval(function(){
            var now_time = new Date();
            if(now_time.getUTCHours()+8==16&&now_time.getUTCMinutes()==0&&now_time.getUTCSeconds()==0)
            {
                var emojis_list=["604532826649526322","604532855938482176","501699773481484288","607826081440858132"];
                fs.readFile("./data/tom_exam.txt", function (err, data) {
                    if (err) throw err;
                 
                    if (data.toString().length >4) 
                    {
                        var PSC = client.channels.get("450975130387218457");   //資甲弱智區區
                        PSC.send("<@&593404925753688064>\n"+data.toString()+"\n祝大家明天都能屌虐"+`${emoji(emojis_list[Math.floor(Math.random()*4)])}`);
                    }
                });
            }
        },1000);
  });

client.on('message', msg => {
    if(msg.author==client.user)
    {
        return;
    }
    ping(msg);
    exam_date(msg,client);
    write_formula(msg,client);
    calculate(msg,client);
    factor(msg,client);
    formula(msg,client);
    test_today(msg);
    look_up_the_dictionary(msg,client);
  });
