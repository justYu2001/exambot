var fs = require('fs');

module.exports = (client) =>{
    
//-------------------------------表情符號-----------------------------

    function emoji(e_id)
    {
        const e = client.emojis.find(emoji => emoji.id === e_id)
        return e;
    }

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

};