const Discord = require('discord.js');
var request = require("request");
const cheerio = require('cheerio');

module.exports = (msg,client) =>{

//----------------------------------表情符號--------------------------------

    function emoji(e_id)
    {
        const e = client.emojis.find(emoji => emoji.id === e_id)
        return e;
    }
//-----------------------------------後續查詢-------------------------------

    function another_search(msg,syn,syn_n,last_msg_id)
    {
        var del_flag=0;
        msg.channel.awaitMessages(a_msg=>a_msg.content.toLocaleLowerCase().startsWith("s ")&&a_msg.author.id==msg.author.id,{maxMatches: 1,time:5*60*1000})
            .then(function(a_msg){
                if(Number(a_msg.first().content.substr(2))-1>=syn_n)
                {
                    var embed=new Discord.RichEmbed();
                    var title_emojis=["608629862252412928","608618455905599488"];
                    str="沒有這個片語編號";
                    embed.addField(`${emoji(title_emojis[Math.floor(Math.random()*2)])}`+str,"請重新輸入",true);
                    embed.setColor(0xFF0000);
                    msg.channel.send({embed});
                    another_search(msg,syn,syn_n,last_msg_id);
                    del_flag=1;
                }
                else
                {
                    lpu(syn[Number(a_msg.first().content.substr(2))-1].split(" "),msg,0);
                    del_flag=1;
                }
            });
            client.setTimeout(function(){
                if(!del_flag)
                {
                    msg.channel.fetchMessage(last_msg_id).then(d_msg=>d_msg.delete());
                }
            },5*60*1000);
    }

//-------------------------------------------查片語---------------------------------------

    function lpu(word,msg,flag)
    {
        var str,eng_expl,ch_expl,exam="";
        var embed = new Discord.RichEmbed();
        embed.setColor(0xFFFFFF);
        var url_phrase=(word[0].includes("/")||word[0].includes("'")?word[0].replace(/(\/|')/g,"+"):word[0]);
        var phrase = word[0];
        for(var i=1;i<word.length;++i)
        {
            phrase+=" "+word[i];
            if(word[i].includes("/"))
            {
                word[i]=word[i].replace(/\//g,"-");
            }
            if(word[i].includes("'"))
            {
                word[i]=word[i].replace(/'/g,"-");
            }
            url_phrase+="-"+word[i];
        }
        request({
            url: "https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/"+url_phrase,
            method: "GET"
        }, function(error, response, body) {
            if (error || !body) {
            return;
            }else{
                var $ = cheerio.load(body);
                var target = $(".sense-block");
                if(target.length<1)
                {
                    var title_emojis=["608629862252412928","608618455905599488"];
                    str="你的搜尋在字典中未能找到符合**"+phrase+"**的片語";
                    embed.addField(`${emoji(title_emojis[Math.floor(Math.random()*2)])}`+" **沒有"+phrase+"這個片語**\n"+str,"請檢查拼寫是否正確",true);
                    embed.setColor(0xFF0000);
                    msg.channel.send({embed});
                }
                else
                {
                    target = $(".phrase-title");
                    if(target.length>0)
                    {
                        target = $(".headword");
                        if(target.eq(0).children(".phrase").length>0)
                        {
                            phrase = "**"+target.eq(0).children(".phrase").text()+"**";
                            embed.addField(phrase,"片語",false);
                            target = $(".sense-body");
                            var sense_body_n=target.length;
                            for(var i=0;i<sense_body_n;++i)
                            {
                                target = $(".sense-body");
                                var def_block_n =target.eq(i).children(".def-block").length;
                                var t_def_block=target.eq(i).children(".def-block");
                                for(var j=0;j<def_block_n;++j)
                                {
                                    eng_expl=t_def_block.eq(j).children(".def-head").eq(0).children(".def").eq(0).text()+"\n";
                                    ch_expl=t_def_block.eq(j).children(".def-body").eq(0).children(".trans").eq(0).text();
                                    var examp_n=t_def_block.eq(j).children(".def-body").eq(0).children(".examp").length;
                                    for(var k=0;k<examp_n;++k)
                                    {
                                        if(k)
                                        {
                                            exam+="\n";
                                        }
                                        exam+=t_def_block.eq(j).children(".def-body").eq(0).children(".examp").eq(k).children(".eg").eq(0).text()+"\n";
                                        exam+=t_def_block.eq(j).children(".def-body").eq(0).children(".examp").eq(k).children(".trans").eq(0).text()+"\n";
                                    }
                                    if(exam.length<2)
                                    {
                                        exam="這個片語在我的字典裡沒有例句。So sad"+`${emoji("501699707618197504")} `;
                                    }
                                    embed.addField(`${emoji("609317785419382795")} `+eng_expl+ch_expl,"\n\n\n"+exam,true);
                                }
                            }
                            msg.channel.send({embed});
                            exam="";
                            target = $(".phrase-title");
                            var syn_n=target.length;
                            for(var i=0;i<syn_n;++i)
                            {
                                embed=new Discord.RichEmbed();
                                target = $(".phrase-title");
                                phrase="**"+target.eq(i).children(".phrase").eq(0).text()+"**";
                                embed.addField(phrase,"相關片語",false);
                                target = $(".phrase-body");
                                eng_expl=target.eq(i).children(".def-block").eq(0).children(".def-head").eq(0).children(".def").eq(0).text()+"\n";
                                ch_expl=target.eq(i).children(".def-block").eq(0).children(".def-body").eq(0).children(".trans").eq(0).text();
                                var examp_n=target.eq(i).children(".def-block").eq(0).children(".def-body").eq(0).children(".examp").length;
                                for(var j=0;j<examp_n;++j)
                                {
                                    if(j)
                                    {
                                        exam+="\n";
                                    }
                                    exam+=target.eq(i).children(".def-block").eq(0).children(".def-body").eq(0).children(".examp").eq(j).children(".eg").eq(0).text()+"\n";
                                    exam+=target.eq(i).children(".def-block").eq(0).children(".def-body").eq(0).children(".examp").eq(j).children(".trans").eq(0).text()+"\n";
                                }
                                if(exam.length<2)
                                {
                                    exam="這個片語在我的字典裡沒有例句。So sad"+`${emoji("501699707618197504")} `;
                                }
                                embed.addField(`${emoji("609317785419382795")} `+eng_expl+ch_expl,"\n\n\n"+exam,true);
                                embed.setColor(0xFFFFFF);
                                msg.channel.send({embed});
                            }
                        }
                        else
                        {
                            console.log(1);
                            var msg_flag=0;
                            target = $(".phrase-title");
                            var n=target.length;
                            for(var i=0;i<n;++i)
                            {
                                target = $(".phrase-title");
                                var cmp_phrase="";
                                var temp=target.eq(i).children(".phrase").eq(0).text().split(" ");
                                for(var j=0;j<temp.length;++j)
                                {
                                    if(temp[j].includes("/"))
                                    {
                                        temp[j]=temp[j].substring(0,temp[j].indexOf("/"));
                                    }
                                    cmp_phrase+=temp[j]+(j==temp.length-1?"":" ");
                                }
                                if(cmp_phrase==phrase||cmp_phrase.includes(phrase))
                                {
                                    msg_flag=1;
                                    embed=new Discord.RichEmbed();
                                    target = $(".phrase-title");
                                    var dis_phrase ="**"+target.eq(i).children(".phrase").eq(0).text()+"**";
                                    embed.addField(dis_phrase,"片語",false);
                                    target = $(".phrase-body");
                                    eng_expl=target.eq(i).children(".def-block").eq(0).children(".def-head").eq(0).children(".def").eq(0).text()+"\n";
                                    ch_expl =target.eq(i).children(".def-block").eq(0).children(".def-body").eq(0).children(".trans").eq(0).text();
                                    var examp_n=target.eq(i).children(".def-block").eq(0).children(".def-body").eq(0).children(".examp").length;
                                    for(var j=0;j<examp_n;++j)
                                    {
                                        if(j)
                                        {
                                            exam+="\n";
                                        }
                                        exam+=target.eq(i).children(".def-block").eq(0).children(".def-body").eq(0).children(".examp").eq(j).children(".eg").eq(0).text()+"\n";
                                        exam+=target.eq(i).children(".def-block").eq(0).children(".def-body").eq(0).children(".examp").eq(j).children(".trans").eq(0).text()+"\n";
                                    }
                                    if(exam.length<2)
                                    {
                                        exam="這個片語在我的字典裡沒有例句。So sad"+`${emoji("501699707618197504")} `;
                                    }
                                    embed.addField(`${emoji("609317785419382795")} `+eng_expl+ch_expl,"\n\n\n"+exam,true);
                                    embed.setColor(0xFFFFFF);
                                    msg.channel.send({embed});
                                    embed=new Discord.RichEmbed();
                                    embed.setColor(0x00AA00);
                                    target = $(".tabs__content");
                                    if(target.length)
                                    {
                                        var syn_n=target.eq(0).children(".pad").eq(0).children().eq(0).children().length;
                                        var syn_str=new String();
                                        var syn=new Array();
                                        for(var j=0;j<syn_n;++j)
                                        {
                                            syn_str+=(j+1)+". "+target.eq(0).children(".pad").eq(0).children().eq(0).children().eq(j).children().eq(0).children().eq(0).children().eq(0).children().eq(0).text()+"\n";
                                            syn.push(target.eq(0).children(".pad").eq(0).children().eq(0).children().eq(j).children().eq(0).children().eq(0).children().eq(0).children().eq(0).text());
                                        }
                                        if(flag)
                                        {
                                            embed.addField("或許你想查的是...",syn_str+"\n"+"請輸入s  <想查詢的片語號碼>  進行查詢\n請在5分鐘內進行查詢",true);
                                            msg.channel.send({embed}).then(last_msg=>{
                                                another_search(msg,syn,syn_n,last_msg.id);
                                            });
                                        }
                                    }
                                }
                            }
                            if(!msg_flag)
                            {
                                embed=new Discord.RichEmbed();
                                var title_emojis=["608629862252412928","608618455905599488"];
                                str="你的搜尋在字典中未能找到符合**"+phrase+"**的片語";
                                embed.addField(`${emoji(title_emojis[Math.floor(Math.random()*2)])}`+" **沒有"+phrase+"這個片語**\n"+str,"請檢查拼寫是否正確",true);
                                embed.setColor(0xFF0000);
                                msg.channel.send({embed});
                            }
                        }
                    }
                    else
                    {
                        target = $(".headword");
                        var hwl = target.length;
                        for(var i=0;i<hwl;++i)
                        {
                            exam="";
                            embed=new Discord.RichEmbed();
                            embed.setColor(0xFFFFFF);
                            target = $(".headword");
                            console.log(target.eq(i).children(".phrase").eq(0).text());
                            var dis_phrase = "**"+target.eq(i).text()+"**";
                            embed.addField(dis_phrase,"片語",false);
                            target = $(".sense-body");
                            var def_b=target.eq(i).children(".def-block").length;
                            for(var j=0;j<def_b;++j)
                            {
                                eng_expl=target.eq(i).children(".def-block").eq(j).children(".def-head").eq(0).children(".def").eq(0).text()+"\n";
                                ch_expl=target.eq(i).children(".def-block").eq(j).children(".def-body").eq(0).children(".trans").eq(0).text();
                                var examp_n=target.eq(i).children(".def-block").eq(j).children(".def-body").eq(0).children(".examp").length;
                                for(var k=0;k<examp_n;++k)
                                {
                                    if(k)
                                    {
                                        exam+="\n";
                                    }
                                    exam+=target.eq(i).children(".def-block").eq(j).children(".def-body").eq(0).children(".examp").eq(k).children(".eg").eq(0).text()+"\n";
                                    exam+=target.eq(i).children(".def-block").eq(j).children(".def-body").eq(0).children(".examp").eq(k).children(".trans").eq(0).text()+"\n";
                                }
                                if(exam.length<2)
                                {
                                    exam="這個片語在我的字典裡沒有例句。So sad"+`${emoji("501699707618197504")} `;
                                }
                                embed.addField(`${emoji("609317785419382795")} `+eng_expl+ch_expl,"\n\n\n"+exam,true);
                                embed.setColor(0xFFFFFF);
                            }
                            msg.channel.send({embed});
                        }
                        embed=new Discord.RichEmbed();
                        embed.setColor(0x00AA00);
                        target = $(".tabs__content");
                        if(target.length)
                        {
                            var syn_n=target.eq(0).children(".pad").eq(0).children().eq(0).children().length;
                            var syn_str=new String();
                            var syn=new Array();
                            for(var i=0;i<syn_n;++i)
                            {
                                syn_str+=(i+1)+". "+target.eq(0).children(".pad").eq(0).children().eq(0).children().eq(i).children().eq(0).children().eq(0).children().eq(0).children().eq(0).text()+"\n";
                                syn.push(target.eq(0).children(".pad").eq(0).children().eq(0).children().eq(i).children().eq(0).children().eq(0).children().eq(0).children().eq(0).text());
                            }
                            
                            if(flag)
                            {
                                embed.addField("或許你想查的是...",syn_str+"\n"+"請輸入s  <想查詢的片語號碼>  進行查詢\n請在5分鐘內進行查詢",true);
                                msg.channel.send({embed}).then(last_msg=>{
                                    another_search(msg,syn,syn_n,last_msg.id);
                                });
                            }
                        }
                    }
                }
            }
        });
    }


    function sup_f(pos,word,o_i)
    {
        return new Promise(function(resolve, reject){
            console.log(pos);
            var sup;
            if(pos.includes("adjective")||pos.includes("adverb"))
            {
                request({
                    url: "https://tw.dictionary.search.yahoo.com/search;_ylt=AwrtXWmVD1pdZ0QAuwN9rolQ;_ylc=X1MDMTM1MTIwMDM4MQRfcgMyBGZyA3NmcARncHJpZANrU1RUSG1zTVFkZU9WTXBGRmFLbkZBBG5fcnNsdAMwBG5fc3VnZwMxMARvcmlnaW4DdHcuZGljdGlvbmFyeS5zZWFyY2gueWFob28uY29tBHBvcwMwBHBxc3RyAwRwcXN0cmwDBHFzdHJsAzMEcXVlcnkDYmFkBHRfc3RtcAMxNTY2MTgzMzIx?p="+word+"&fr2=sb-top-tw.dictionary.search&fr=sfp",
                    method: "GET"
                    }, function(error, response, body) {
                    if (error || !body) {
                        return;
                    }else{
                        var y_flag=0;
                        var y$ = cheerio.load(body);
                        var y_target=y$(".compArticleList");
                        var com_n=y_target.eq(0).children(".ov-a").length;
                        for(var i=0;i<com_n;++i)
                        {
                            if(y_target.eq(0).children(".ov-a").eq(i).children().eq(0).children(".fz-14").eq(0).text().includes("比較級"))
                            {
                                y_flag=1;
                                sup = y_target.eq(0).children(".ov-a").eq(i).children().eq(0).children(".fz-14").eq(0).text();
                                sup=sup.substring(0,sup.indexOf("最"))+"\n"+sup.substring(sup.indexOf("最"));
                                resolve([pos,o_i,sup]);
                            }
                        }
                        if(!y_flag)
                        {
                            sup = "這個單字沒有比較級和最高級";
                            resolve([pos,o_i,sup]);
                        }
                    }
                    });
            }
            else if(pos.includes("verb"))
            {
                request({
                    url: "https://tw.dictionary.search.yahoo.com/search;_ylt=AwrtXWkKDVpdGnYA8lN9rolQ;_ylu=X3oDMTBvYjg4OHI4BGNvbG8DBHBvcwMxBHZ0aWQDBHNlYwNzYw--?p="+word+"&ei=UTF-8&context=gsmcontext%3A%3Alimlangpair%3A%3Aen_en&fr=sfp",
                    method: "GET"
                    }, function(error, response, body) {
                    if (error || !body) {
                        return;
                    }else{
                        sup="";
                        var y_flag=0;
                        var y$ = cheerio.load(body);
                        var y_target=y$(".compArticleList");
                        var com_n=y_target.eq(0).children(".ov-a").length;
                        for(var i=0;i<com_n;++i)
                        {
                            if(y_target.eq(0).children(".ov-a").eq(i).children().eq(0).children(".fz-14").eq(0).text().includes("verb"))
                            {
                                sup=  y_target.eq(0).children(".ov-a").eq(i).children().eq(0).children(".fz-14").eq(0).text();
                                var temp=sup.split(":");
                                sup="第三人稱變化:"+temp[2].split(",",1)+"\n現在分詞:"+temp[3].split(",",1)+"\n過去式:"+temp[4].split(",",1)+"\n過去分詞:"+temp[5];
                                y_flag=1;
                                resolve([pos,o_i,sup]);
                            }
                        }
                        if(!y_flag)
                        {
                            resolve([pos,o_i,sup]);
                        }
                    }
                    });
            }
            else if(pos.includes("noun"))
            {
                request({
                    url: "https://tw.dictionary.search.yahoo.com/search;_ylt=AwrtXWkKDVpdGnYA8lN9rolQ;_ylu=X3oDMTBvYjg4OHI4BGNvbG8DBHBvcwMxBHZ0aWQDBHNlYwNzYw--?p="+word+"&ei=UTF-8&context=gsmcontext%3A%3Alimlangpair%3A%3Aen_en&fr=sfp",
                    method: "GET"
                    }, function(error, response, body) {
                    if (error || !body) {
                        return;
                    }else{
                        sup="";
                        var y_flag=0;
                        var y$ = cheerio.load(body);
                        var y_target=y$(".compArticleList");
                        var com_n=y_target.eq(0).children(".ov-a").length;
                        for(var i=0;i<com_n;++i)
                        {
                            if(y_target.eq(0).children(".ov-a").eq(i).children().eq(0).children(".fz-14").eq(0).text().includes("noun"))
                            {
                                y_flag=1;
                                sup = y_target.eq(0).children(".ov-a").eq(i).children().eq(0).children(".fz-14").eq(0).text();
                                var temp = sup.split(":");
                                sup=(temp.length>2?"名詞複數:"+temp[2]:"這個名詞沒有複數形");
                                resolve([pos,o_i,sup]);
                            }
                        }
                        if(!y_flag)
                        {
                            resolve([pos,o_i,sup]);
                        }
                    }
                    });
            }
        });
    }

//------------------------------------查單字--------------------------------

    function lvu(word,msg)
    {
        var str,phrase,eng_expl,ch_expl,exam="";
        var embed = new Discord.RichEmbed();
        embed.setColor(0xFFFFFF);
        request({
            url: "https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/"+word[0],
            method: "GET"
        }, function(error, response, body) {
            if (error || !body) {
            return;
            }
            else
            {
                var $ = cheerio.load(body);
                var target = $(".pos-header");
                if(target.length<1)
                {
                    var title_emojis=["608629862252412928","608618455905599488"];
                    str="你的搜尋在字典中未能找到符合**"+word[0]+"**的單字";
                    embed.addField(`${emoji(title_emojis[Math.floor(Math.random()*2)])}`+" **沒有"+word[0]+"這個單字**\n"+str,"請檢查拼寫是否正確",true);
                    embed.setColor(0xFF0000);
                    msg.channel.send({embed})
                }
                else
                {
                    target = $(".headword");
                    var hw_n=target.length;
                    var msg_n=0;
                    for(var i=0;i<hw_n;++i)
                    {
                        target = $(".cdo-section-title-hw");
                        var pos=target.eq(i).children(".posgram").eq(0).text();
                        target = $(".headword");
                        var w2f = target.eq(i).text();
                        sup_f(pos,w2f,i).then(function(p){
                                embed=new Discord.RichEmbed();
                                embed.setColor(0xFFFFFF);
                                target = $(".uk");
                                if(target.length>0)
                                {
                                    var uk_url="https://dictionary.cambridge.org/zht/media/英語-漢語-繁體"+target.eq(0).children().eq(1).attr('data-src-mp3').substr(67);
                                    var uk_ps="["+target.eq(0).children(".pron").eq(0).text().replace(/\//g,"")+"]";                  
                                    target = $(".us");
                                    var us_url="https://dictionary.cambridge.org/zht/media/英語-漢語-繁體"+target.eq(0).children().eq(1).attr('data-src-mp3').substr(67);
                                    var us_ps="["+target.eq(0).children(".pron").eq(0).text().replace(/\//g,"")+"]";
                                    embed.addField("**"+word[0].toLowerCase()+"**","("+p[0]+")\n"+"[美式發音]("+us_url+"):"+us_ps+"\n[英式發音]("+uk_url+"):"+uk_ps+"\n"+p[2],false);
                                }
                                else
                                {
                                    embed.addField("**"+word[0].toLowerCase()+"**",p[2],false);
                                }
                                target = $(".pos-body");
                                var s_n=target.eq(p[1]).children(".sense-block").length;
                                for(var s_i=0;s_i<s_n;++s_i)
                                {
                                    target = $(".pos-body");
                                    var def_n=target.eq(p[1]).children(".sense-block").eq(s_i).children(".sense-body").eq(0).children(".def-block").length;
                                    for(var def_i=0;def_i<def_n;++def_i)
                                    {
                                        exam="";
                                        eng_expl=target.eq(p[1]).children(".sense-block").eq(s_i).children(".sense-body").eq(0).children(".def-block").eq(def_i).children(".def-head").eq(0).children(".def-info").eq(0).children(".gram").eq(0).text()+" ";
                                        var temp = target.eq(p[1]).children(".sense-block").eq(s_i).children(".sense-body").eq(0).children(".def-block").eq(def_i).children(".def-head").eq(0).children(".def").eq(0).text().split("\n");
                                        for(var t_i=0;t_i<temp.length;++t_i)
                                        {
                                            if(t_i)
                                            {
                                                temp[t_i]=temp[t_i].trim();
                                            }
                                            eng_expl+=" "+temp[t_i];
                                        }
                                        eng_expl+="\n";
                                        ch_expl=target.eq(p[1]).children(".sense-block").eq(s_i).children(".sense-body").eq(0).children(".def-block").eq(def_i).children(".def-body").eq(0).children(".trans").eq(0).text();
                                        var exam_n=target.eq(p[1]).children(".sense-block").eq(s_i).children(".sense-body").eq(0).children(".def-block").eq(def_i).children(".def-body").eq(0).children(".examp").length;
                                        for(var exam_i=0;exam_i<exam_n;++exam_i)
                                        {
                                            if(exam_i)
                                            {
                                                exam+="\n";
                                            }
                                            exam+=target.eq(p[1]).children(".sense-block").eq(s_i).children(".sense-body").eq(0).children(".def-block").eq(def_i).children(".def-body").eq(0).children(".examp").eq(exam_i).children(".eg").eq(0).text()+"\n";
                                            exam+=target.eq(p[1]).children(".sense-block").eq(s_i).children(".sense-body").eq(0).children(".def-block").eq(def_i).children(".def-body").eq(0).children(".examp").eq(exam_i).children(".trans").eq(0).text()+"\n";
                                        }
                                        if(exam.length<2)
                                        {
                                            exam="這個解釋在我的字典裡沒有例句。So sad"+`${emoji("501699707618197504")} `;
                                        }
                                        if(embed.fields.length<19)
                                        {
                                            embed.addField(`${emoji("609317785419382795")} `+eng_expl+ch_expl,"\n\n\n"+exam,false);
                                        }
                                    }
                                }
                                if(embed.fields.length>1)
                                {
                                    msg.channel.send({embed}).then(function(){
                                        ++msg_n;
                                        if(msg_n==hw_n)
                                        {
                                            target=$(".phrase-block");
                                            var p_n=target.length;
                                            for(var i=0;i<p_n;++i)
                                            {
                                                embed= new Discord.RichEmbed();
                                                exam="";
                                                target=$(".phrase-block");
                                                phrase=target.eq(i).children(".phrase-head").eq(0).children(".phrase-title").eq(0).text();
                                                embed.addField("**"+phrase+"**","相關字",false);
                                                eng_expl=target.eq(i).children(".phrase-body").eq(0).children(".def-block").eq(0).children(".def-head").eq(0).children(".def").eq(0).text()+"\n";
                                                ch_expl=target.eq(i).children(".phrase-body").eq(0).children(".def-block").eq(0).children(".def-body").eq(0).children(".trans").eq(0).text();
                                                var exam_n=target.eq(i).children(".phrase-body").eq(0).children(".def-block").eq(0).children(".def-body").eq(0).children(".examp").length;
                                                for(var j=0;j<exam_n;++j)
                                                {
                                                    exam+=target.eq(i).children(".phrase-body").eq(0).children(".def-block").eq(0).children(".def-body").eq(0).children(".examp").eq(j).children(".eg").eq(0).text()+"\n";
                                                    exam+=target.eq(i).children(".phrase-body").eq(0).children(".def-block").eq(0).children(".def-body").eq(0).children(".examp").eq(j).children(".trans").eq(0).text()+"\n";
                                                }
                                                if(exam.length<2)
                                                {
                                                    str=(phrase.includes(" ")?"片語":"單字");
                                                    exam="這個"+str+"在我的字典裡沒有例句。So sad"+`${emoji("501699707618197504")} `
                                                }
                                                embed.setColor(0xFFFFFF);
                                                embed.addField(`${emoji("609317785419382795")} `+eng_expl+ch_expl,"\n\n\n"+exam,false);
                                                msg.channel.send({embed});
                                            }
                                        }
                                    });
                                }
                                else
                                {
                                    --hw_n;
                                }
                        });
                    }
                }
            }
        });
    }

    if(msg.content.toLowerCase().startsWith("dic"))
    {
        var word = msg.content.substr(4).split(" ");
        if(word.length<2)
        {
            lvu(word,msg);
        }
        else
        {
            lpu(word,msg,1);
        }
    }
};