const Discord = require('discord.js')
var fs = require('fs');
const client = new Discord.Client();
const count_down = require("./events/count_down.js");
const test_remind = require("./events/test_remind.js")
const ping = require("./events/ping.js");
const exam_date = require("./events/exam_date.js");
const write_formula = require("./events/write_formula.js");
const calculate = require("./events/calculate.js");
const factor = require("./events/factor.js");
const formula = require("./events/formula.js");
const test_today = require("./events/test_today.js");
//const look_up_the_dictionary = require("./events/look_up_the_dictionary.js");
const help = require("./events/help.js");
const token = require("./token.js");
client.login(token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    var c = client.channels.get("612180981172142090");
    c.send({files:["https://i.imgur.com/ogbcvHB.png"]});
    count_down(client);
    test_remind(client);
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
    //look_up_the_dictionary(msg,client);
    help(msg,client);
  });
