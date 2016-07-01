/**
 * CreateDate 3/18/16
 * Author frank.zhang
 * Description
 */

'use strict';

var wechatAPI=require('wechat/api');

var appId='wx6ab358829c68dea7';
var openId='oTP7sw0_txBIM-AW2GmtjlkhtUuI';

describe('wechatAPI/message',()=>{
 describe('chat(appId,message)',()=>{
   it('chat text',function(done){
     var message={
       'touser':openId,
       'msgtype':'text',
       'text':{
         'content':'Hello world!'
       },
       customservice:{
         kf_account:'frank1@ff'
       }
     };
     wechatAPI.message.chat(appId,message).then(res=>{
       console.log(res);
       done();
     },err=>{
       done(err);
     });
   });

   it('chat image',function(done){
     var message={
       'touser':openId,
       'msgtype':'image',
       'image':{
         'media_id':'fh0dNaOq3liW91YzYLrmRDewI-YyGAt921XMH8HjifA'
       }
     };
     wechatAPI.message.chat(appId,message).then(res=>{
       console.log(res);
       done();
     },err=>{
       done(err);
     });
   });

   it('chat voice',function(done){
     var message={
       'touser':openId,
       'msgtype':'voice',
       'voice':{
         'media_id':'fh0dNaOq3liW91YzYLrmRFIKcfB8l6312EgPyNLbaGU'
       }
     };
     wechatAPI.message.chat(appId,message).then(res=>{
       console.log(res);
       done();
     },err=>{
       done(err);
     });
   });

   it('chat video',function(done){
     var message={
       'touser':openId,
       'msgtype':'video',
       'video':{
         'media_id':'fh0dNaOq3liW91YzYLrmRMc2ZJvWmNkrfr9guyRgxoY',
         'thumb_media_id':'fh0dNaOq3liW91YzYLrmRAd6kTr4ciyH4M18-sy0eU0',
         'title':'hero',
         'introduction':'大圣归来剪辑'
       }
     };
     wechatAPI.message.chat(appId,message).then(res=>{
       console.log(res);
       done();
     },err=>{
       done(err);
     });
   });

   it('chat music',function(done){
     var message={
       'touser':openId,
       'msgtype':'music',
       'music':{
         "title":"不要忘记我爱你",
         "description":"张碧晨-不要忘记我爱你",
         "musicurl":"http://fs.web.kugou.com/f6a7e31a7c2570e2502e905c48eb0816/571f2038/G016/M05/0B/11/8JMEAFV1YRmIb9lUAA4iE_Goa_YAAAvUAMZseQADiIr476.m4a",
         "hqmusicurl":"http://fs.web.kugou.com/f6a7e31a7c2570e2502e905c48eb0816/571f2038/G016/M05/0B/11/8JMEAFV1YRmIb9lUAA4iE_Goa_YAAAvUAMZseQADiIr476.m4a",
         "thumb_media_id":"fh0dNaOq3liW91YzYLrmRAd6kTr4ciyH4M18-sy0eU0"
       }
     };
     wechatAPI.message.chat(appId,message).then(res=>{
       console.log(res);
       done();
     },err=>{
       done(err);
     });
   });

   //max 8 items
   it('chat text-image outer link',function(done){
     var message={
       'touser':openId,
       'msgtype':'news',
       'news':{
         'articles':[
           {
           'title':'baidu',
           'description':'中国最大的搜索引擎',
           'url':'http://www.baidu.com',
           'picurl':'http://www.baidu.com/img/2016_4_26logo_843a64cc86a54b8da14d7e9baad4d15f.gif'
          },
           {
             'title':'google',
             'description':'The world best search engine',
             'url':'http://www.google.com',
             'picurl':'https://www.google.com.hk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
           }
         ]
       }
     };
     wechatAPI.message.chat(appId,message).then(res=>{
       console.log(res);
       done();
     },err=>{
       done(err);
     });
   });

   it('chat text-image article',function(done){
     var message={
       'touser':openId,
       'msgtype':'mpnews',
       'mpnews':{
         'media_id':'fh0dNaOq3liW91YzYLrmRG5_0q0wDwRZPdZXJXi4R-I'
       }
     };
     wechatAPI.message.chat(appId,message).then(res=>{
       console.log(res);
       done();
     },err=>{
       done(err);
     });
   });

   //todo chat card
 });

  describe('getAutoReply(appId)',()=>{
    it('should return list',(done)=>{
      wechatAPI.message.getAutoReply(appId).then(result=>{
        console.log(result);
        done();
      },err=>{
        done(err);
      })
    })
  });

  describe('groupMessage(appId,groupMessage)',()=>{
    it('group text',function(done){
      var groupMessage={
        "filter":{
          "is_to_all":false,
          "tag_id":2
        },
        "text":{
          "content":"hello world"
        },
        "msgtype":"text"
      };
      wechatAPI.message.groupMessage(appId,groupMessage).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      });
    });

    it('group image',function(done){
      var groupMessage={
        "filter":{
          "is_to_all":false,
          "tag_id":2
        },
        "image":{
          "media_id":"fh0dNaOq3liW91YzYLrmRDewI-YyGAt921XMH8HjifA"
        },
        "msgtype":"image"
      };
      wechatAPI.message.groupMessage(appId,groupMessage).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      });
    });

    it('group voice',function(done){
      var groupMessage={
        "filter":{
          "is_to_all":false,
          "tag_id":2
        },
        "voice":{
          "media_id":"fh0dNaOq3liW91YzYLrmRFIKcfB8l6312EgPyNLbaGU"
        },
        "msgtype":"voice"
      };
      wechatAPI.message.groupMessage(appId,groupMessage).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      });
    });

    it('group video',function(done){
      var groupMessage={
        "filter":{
          "is_to_all":false,
          "tag_id":2
        },
        "mpvideo":{
          "media_id":"fh0dNaOq3liW91YzYLrmRMc2ZJvWmNkrfr9guyRgxoY",
        },
        "msgtype":"mpvideo"
      };
      wechatAPI.message.groupMessage(appId,groupMessage).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      });
    });


    it('group text-image article',function(done){
      var groupMessage={
        "filter":{
          "is_to_all":false,
            "tag_id":2
        },
        "mpnews":{
          "media_id":"fh0dNaOq3liW91YzYLrmRG5_0q0wDwRZPdZXJXi4R-I"
        },
        "msgtype":"mpnews"
      };
      wechatAPI.message.groupMessage(appId,groupMessage).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      });
    });

    //todo chat card
  });
});

