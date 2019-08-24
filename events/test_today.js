var fs = require('fs');

module.exports = (msg) =>{

    if(msg.content.toLowerCase() == "wtt")
    {
        var t = new Date();
        t.setHours(t.getUTCHours()+8);
        if(((t.getDay()==1||t.getDay()==2||t.getDay()==5)&&t.getHours()>=12)||((t.getDay()==3||t.getDay()==4)&&t.getHours()>=17))
        {
            msg.channel.send("放學了啦");
        }
        else
        {
            console.log(t.getDay());
            fs.readFile("./data/today_exam.txt", function (err, data) {
                if (err) throw err;
             
                if (data.toString().length < 5||t.getDay()==6||t.getDay()==0) 
                {
                    msg.channel.send("今天沒有考試");
                }
                else
                {
                    var str=data.toString().substr(5);
                    msg.channel.send(str);
                }
            });
        }
    }
};