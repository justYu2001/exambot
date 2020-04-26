module.exports = (client) => {
  var gd = new Date();
  gd.setFullYear(2020);
  gd.setMonth(4);
  gd.setDate(2);
  gd.setHours(0);
  gd.setMinutes(0);
  gd.setSeconds(0);

  function game_activity() {
    var nd = new Date();
    var time = gd.getTime() - (nd.getTime() + 8 * 60 * 60 * 1000);
    var d = parseInt(time / (24 * 60 * 60 * 1000));
    var h = parseInt((time % (24 * 60 * 60 * 1000)) / 60 / 60 / 1000);
    var m = parseInt(
      ((time % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / 60 / 1000
    ); /*
        var s = parseInt(time%(24*60*60*1000)%(60*60*1000)%(60*1000)/1000);*/
    if (time >= 0) {
      client.user.setActivity('統測倒數' + d + '天' + h + '時' + m + '分', {
        type: 'PLAYING',
      });
    } else {
      client.user.setActivity('考統測囉!Go!Go!Go!', { type: 'PLAYING' });
    }
    if (
      (nd.getUTCHours() + 8) % 24 === 0 &&
      nd.getUTCMinutes() === 0 &&
      nd.getUTCSeconds() === 0
    ) {
      var c = client.channels.get('681171510609838100');
      if (d === 0) {
        c.send('<@&593404925753688064> 剩最後一天');
      } else {
        c.send(`<@&593404925753688064> 剩 ${d + 1} 天`);
      }
    }
  }

  client.setInterval(function () {
    game_activity();
  }, 1000);
};
