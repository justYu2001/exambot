module.exports = (client) =>{

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

    client.setInterval(function(){
        game_activity();
    },1000);
};