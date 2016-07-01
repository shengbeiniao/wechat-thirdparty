/**
 * CreateDate 3/18/16
 * Author frank.zhang
 * Description
 */

'use strict';

var fs=require('fs');
var wechatAPI=require('wechat/api')
var appId='wx6ab358829c68dea7';

describe('wechatAPI/material',()=>{
  describe('putMedia(appId,type,media)',()=>{
    /*
     { type: 'image',
     media_id: '3DC8TdXIkqWJO9NcQnL8emvv-ZhNuQd6aBhjR6mdh6-ktiIHo0lZZZNJav63aA4N',
     created_at: 1461568932 }
     */
    it('upload image<2M',function(done){
      this.timeout(5000);
      var path=__dirname+'/media/normal.jpg';
      var buffer=fs.readFileSync(path);
      var type='image';
      var media= {
        value:buffer,
        options: {
          filename: 'normal.jpg',
          contentType: 'image/jpg'
        }
      };
      wechatAPI.material.putMedia(appId,type,media).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });

    /*
     {"errcode":40006,"errmsg":"invalid meida size hint: [KiBfOA0483e297]"}
     */
    it.skip('upload image>2M',function(done){
      this.timeout(5000);
      var path=__dirname+'/media/large.jpg';
      var buffer=fs.readFileSync(path);
      var type='image';
      var media= {
        value:buffer,
        options: {
          filename: 'large.jpg',
          contentType: 'image/jpg'
        }
      };
      wechatAPI.material.putMedia(appId,type,media).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });

    /*
     { type: 'image',
     media_id: 'zFCBIX98CEHY6uSMKMGYDb19s4r7s1soZleBHrJh3K9jfa6yrU0oAMgsd9Y1J_R2',
     created_at: 1461574510 }
     */
    it('upload png',function(done){
      this.timeout(5000);
      var path=__dirname+'/media/mario.png';
      var buffer=fs.readFileSync(path);
      var type='image';
      var media= {
        value:buffer,
        options: {
          filename: 'mario.png',
          contentType: 'image/png'
        }
      };
      wechatAPI.material.putMedia(appId,type,media).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  describe('getMedia(appId,mediaId)',()=>{
    it('get image',function(done){
      this.timeout(5000);
      var mediaId='3DC8TdXIkqWJO9NcQnL8emvv-ZhNuQd6aBhjR6mdh6-ktiIHo0lZZZNJav63aA4N';
      wechatAPI.material.getMedia(appId,mediaId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  describe('putMaterial(appId,type,media)',()=>{
    /*
     { media_id: 'fh0dNaOq3liW91YzYLrmRJirtKZioAf-IXOPv9abcHs',
     url: 'https://mmbiz.qlogo.cn/mmbiz/Imjq6FyPKUxXhD7T6kkTNqruVq5jUBgmTMO19P6PjSzXcr340PpA12reJrJy8iadlQ5M6ccSQzGB780xva41Pbw/0?wx_fmt=jpeg' }
     */
    it('upload image<2M',function(done){
      this.timeout(5000);
      var path=__dirname+'/media/normal.jpg';
      var buffer=fs.readFileSync(path);
      var type='image';
      var media= {
        value:buffer,
        options: {
          filename: 'normal.jpg',
          contentType: 'image/jpg'
        }
      };
      wechatAPI.material.putMaterial(appId,type,media).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });

    /*
     {"errcode":45001,"errmsg":"media size out of limit hint: [kyH1Ja0558e297]"}
     */
    it('upload image>2M',function(done){
      this.timeout(5000);
      var path=__dirname+'/media/large.jpg';
      var buffer=fs.readFileSync(path);
      var type='image';
      var media= {
        value:buffer,
        options: {
          filename: 'large.jpg',
          contentType: 'image/jpg'
        }
      };
      wechatAPI.material.putMaterial(appId,type,media).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });

    /*
     { media_id: 'fh0dNaOq3liW91YzYLrmRK-_279qHcsczfv8gk2cGJ4',
     url: 'https://mmbiz.qlogo.cn/mmbiz/Imjq6FyPKUxXhD7T6kkTNqruVq5jUBgmmkThqctkX1kichQiaHPZunzl9SfwTa6BORP0V5t5O3HZaG9YkCdibK22g/0?wx_fmt=png' }
     */
    it('upload png',function(done){
      this.timeout(5000);
      var path=__dirname+'/media/mario.png';
      var buffer=fs.readFileSync(path);
      var type='image';
      var media= {
        value:buffer,
        options: {
          filename: 'mario.png',
          contentType: 'image/png'
        }
      };
      wechatAPI.material.putMaterial(appId,type,media).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });

    /*
     { media_id: 'fh0dNaOq3liW91YzYLrmRDewI-YyGAt921XMH8HjifA',
     url: 'https://mmbiz.qlogo.cn/mmbiz/Imjq6FyPKUxXhD7T6kkTNqruVq5jUBgmSCWPhIFMXWODNIA9L1SVTyMLtxniavrs9EoH6zkjGvtQrick5kp5azdQ/0?wx_fmt=gif' }
     */
    it('upload gif',function(done){
      this.timeout(5000);
      var path=__dirname+'/media/cat.gif';
      var buffer=fs.readFileSync(path);
      var type='image';
      var media= {
        value:buffer,
        options: {
          filename: 'cat.gif',
          contentType: 'image/gif'
        }
      };
      wechatAPI.material.putMaterial(appId,type,media).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });

    /*
     { media_id: 'fh0dNaOq3liW91YzYLrmRFIKcfB8l6312EgPyNLbaGU' }
     */
    it('upload voice',function(done){
      this.timeout(5000);
      var path=__dirname+'/media/without you.mp3';
      var buffer=fs.readFileSync(path);
      var type='voice';
      var media= {
        value:buffer,
        options: {
          filename: 'without you.mp3',
          contentType: 'audio/mp3'
        }
      };
      wechatAPI.material.putMaterial(appId,type,media).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });

    /*
     { media_id: 'fh0dNaOq3liW91YzYLrmRAd6kTr4ciyH4M18-sy0eU0',
     url: 'https://mmbiz.qlogo.cn/mmbiz/Imjq6FyPKUxXhD7T6kkTNqruVq5jUBgmxmcVO0ibvoZBT0qNLSKPvXsA7vfKorNibOqxAISTYPTic3w9h529qFfkg/0?wx_fmt=jpeg' }
     */
    it('upload thumb',function(done){
      this.timeout(5000);
      var path=__dirname+'/media/thumb.jpg';
      var buffer=fs.readFileSync(path);
      var type='thumb';
      var media= {
        value:buffer,
        options: {
          filename: 'thumb.jpg',
          contentType: 'image/jpg'
        }
      };
      wechatAPI.material.putMaterial(appId,type,media).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });

    /*
     { media_id: 'fh0dNaOq3liW91YzYLrmRMc2ZJvWmNkrfr9guyRgxoY' }
     */
    it('upload video<20M',function(done){
      this.timeout(20000);
      var path=__dirname+'/media/hero.mp4';
      var buffer=fs.readFileSync(path);
      var type='video';
      var media= {
        value:buffer,
        options: {
          filename: 'hero.mp4',
          contentType: 'video/mp4'
        }
      };
      var description={
        title:'hero',
        introduction:'大圣归来剪辑'
      };
      wechatAPI.material.putMaterial(appId,type,media,description).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });

    /*
     可以上传,不过转码失败
     { media_id: 'fh0dNaOq3liW91YzYLrmRBpHJZ1H0c-BOt2l9u4am8Q' }
     */
    it('upload video>20M',function(done){
      this.timeout(20000);
      var path=__dirname+'/media/hero-big.mp4';
      var buffer=fs.readFileSync(path);
      var type='video';
      var media= {
        value:buffer,
        options: {
          filename: 'hero-big.mp4',
          contentType: 'video/mp4'
        }
      };
      var description={
        title:'hero',
        introduction:'大圣归来剪辑'
      };
      wechatAPI.material.putMaterial(appId,type,media,description).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  describe('getVideo(appId,mediaId)',()=>{
    it('should return download url',function(done){
      this.timeout(5000);
      var mediaId='fh0dNaOq3liW91YzYLrmRMc2ZJvWmNkrfr9guyRgxoY';
      wechatAPI.material.getVideo(appId,mediaId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      });
    });
  });

  describe('getMaterial(appId,mediaId)',()=>{
    //string
    it('get image',function(done){
      this.timeout(5000);
      var mediaId='fh0dNaOq3liW91YzYLrmRDfWXAhPTqrmR_Xo9qhueaA';
      wechatAPI.material.getMaterial(appId,mediaId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      });
    });

    //string
    it('get audio',function(done){
      this.timeout(5000);
      var mediaId='fh0dNaOq3liW91YzYLrmRFIKcfB8l6312EgPyNLbaGU';
      wechatAPI.material.getMaterial(appId,mediaId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  describe('putArticleImage(appId,media)',()=>{
    /*
     { url: 'http://mmbiz.qpic.cn/mmbiz/Imjq6FyPKUzsmoYjQ34EjPVcZl8rGmn9AL8ibJTGFuqaiadyNum9SxwpHwau8gOV24UjlB1ZC7VY2smE21ZycgdA/0' }
     */
    it('upload image<2M',function(done){
      this.timeout(5000);
      var path=__dirname+'/media/normal.jpg';
      var buffer=fs.readFileSync(path);
      var media= {
        value:buffer,
        options: {
          filename: 'normal.jpg',
          contentType: 'image/jpg'
        }
      };
      wechatAPI.material.putArticleImage(appId,media).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  /*
   { media_id: 'fh0dNaOq3liW91YzYLrmRG5_0q0wDwRZPdZXJXi4R-I' }
   */
  describe('putArticle(appId,article)',function(){
    this.timeout(5000);
    it('should return mediaId',function(done){
      var article={
        "title":"世界人口黑市",
        "thumb_media_id":"DzWyk24OfpqxWAicRHKlb23ONPK88OlwQhkyglehIZ4",
        "author":"霍启明",
        "digest":"带你见识真正的地狱：世界人口黑市",
        "show_cover_pic":0,
        "content":fs.readFileSync(__dirname+'/media/article.html','utf8'),
        "content_source_url":"http://sanzhi.me"
      };
      wechatAPI.material.putArticle(appId,article).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  /*
   [ { title: '世界人口黑市',
   author: '霍启明',
   digest: '带你见识真正的地狱：世界人口黑市',
   content: 'rich html text...',
   content_source_url: 'http://sanzhi.me',
   thumb_media_id: 'DzWyk24OfpqxWAicRHKlb23ONPK88OlwQhkyglehIZ4',
   show_cover_pic: 0,
   url: 'http://mp.weixin.qq.com/s?__biz=MzI4NzA4ODcxNg==&mid=503207169&idx=1&sn=26bdc670daf5fdd96689aa65568cf157#rd',
   thumb_url: 'http://mmbiz.qpic.cn/mmbiz/Imjq6FyPKUzsmoYjQ34EjPVcZl8rGmn9PNKtVhCveAUfK7qekfMBGehEMjsfpmGr6bEqSUrvgJcicE9E02C5snQ/0?wx_fmt=jpeg' } ]
   */
  describe('getArticle(appId,mediaId)',function(){
    this.timeout(5000);
    it('should return list',function(done){
      var mediaId='fh0dNaOq3liW91YzYLrmRG5_0q0wDwRZPdZXJXi4R-I';
      wechatAPI.material.getArticle(appId,mediaId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  /*
   { errcode: 0, errmsg: 'ok' }
   */
  describe('updateArticle(appId,mediaId,article,index)',function(){
    this.timeout(5000);
    it('should return ok',function(done){
      var mediaId='fh0dNaOq3liW91YzYLrmRG5_0q0wDwRZPdZXJXi4R-I';
      var article={
        "title":"世界人口黑市",
        "thumb_media_id":"DzWyk24OfpqxWAicRHKlb23ONPK88OlwQhkyglehIZ4",
        "author":"霍启明",
        "digest":"带你见识真正的地狱：世界人口黑市",
        "show_cover_pic":0,
        "content":fs.readFileSync(__dirname+'/media/article.html','utf8'),
        "content_source_url":"http://sanzhi.me"
      };
      wechatAPI.material.updateArticle(appId,mediaId,article).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  /*
   { errcode: 0, errmsg: 'ok' }
   */
  describe('removeMaterial(appId,mediaId)',function(){
    this.timeout(5000);
    it('should return ok',function(done){
      var mediaId='fh0dNaOq3liW91YzYLrmRJ4HIqXHJqnjEcpD1F4PU5U';
      wechatAPI.material.removeMaterial(appId,mediaId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  /*
   { voice_count: 3,
   video_count: 4,
   image_count: 55,
   news_count: 18 }
   */
  describe('getMaterialCount(appId)',function(){
    this.timeout(5000);
    it('should return json',function(done){
      wechatAPI.material.getMaterialCount(appId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  describe('getMaterialList(appId,type,offset)',function(){
    this.timeout(5000);
    /*
     { item:
     [ { media_id: 'fh0dNaOq3liW91YzYLrmRAd6kTr4ciyH4M18-sy0eU0',
     name: 'thumb.jpg',
     update_time: 1461579995,
     url: 'http://mmbiz.qpic.cn/mmbiz/Imjq6FyPKUxXhD7T6kkTNqruVq5jUBgmxmcVO0ibvoZBT0qNLSKPvXsA7vfKorNibOqxAISTYPTic3w9h529qFfkg/0?wx_fmt=jpeg' },
     { media_id: 'fh0dNaOq3liW91YzYLrmRK6kt8mb75Xg0KfYx6u-Tn8',
     name: 'thumb.jpg',
     update_time: 1461579953,
     url: 'http://mmbiz.qpic.cn/mmbiz/Imjq6FyPKUxXhD7T6kkTNqruVq5jUBgmxmcVO0ibvoZBT0qNLSKPvXsA7vfKorNibOqxAISTYPTic3w9h529qFfkg/0?wx_fmt=jpeg' },
     ],
     total_count: 55,
     item_count: 20 }
     */
    it('get image list',function(done){
      var type='image';
      wechatAPI.material.getMaterialList(appId,type).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });

    /*
     {
     "total_count": TOTAL_COUNT,
     "item_count": ITEM_COUNT,
     "item": [{
       "media_id": MEDIA_ID,
       "content": {
            news_item:
           [{
               title: '世界人口黑市',
               author: '霍启明',
               digest: '带你见识真正的地狱：世界人口黑市',
               content: 'rich html text...',
               content_source_url: 'http://sanzhi.me',
               thumb_media_id: 'DzWyk24OfpqxWAicRHKlb23ONPK88OlwQhkyglehIZ4',
               show_cover_pic: 0,
               url: 'http://mp.weixin.qq.com/s?__biz=MzI4NzA4ODcxNg==&mid=503207169&idx=1&sn=26bdc670daf5fdd96689aa65568cf157#rd',
               thumb_url: 'http://mmbiz.qpic.cn/mmbiz/Imjq6FyPKUzsmoYjQ34EjPVcZl8rGmn9PNKtVhCveAUfK7qekfMBGehEMjsfpmGr6bEqSUrvgJcicE9E02C5snQ/0'
             }],
           create_time: 1461655093,
           update_time: 1461655449
       },
       "update_time": UPDATE_TIME}]
     }
     */
    it('get article list',function(done){
      var type='news';
      wechatAPI.material.getMaterialList(appId,type).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });
});
