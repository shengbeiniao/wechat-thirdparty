/**
 * CreateDate 3/18/16
 * Author frank.zhang
 * Description
 */

'use strict';

var appId='wx6ab358829c68dea7';
var wechatAPI=require('wechat/api');

var fs=require('fs');
//console.log(fs.readFileSync(__dirname+'/test.html'),'utf8');

describe('getMenu(appId)',()=>{
  it('should return menu json',done=>{
    wechatAPI.getMenu(appId).then(res=>{
      console.log(res);
      done();
    },err=>{
      done(err);
    })
  })
});

describe('wechat/api/material', function () {
  describe('putArticle(appId,article)',function(){
    this.timeout(5000);
    it('should return list',function(done){
      var article={
        "title":"Test",
        "thumb_media_id":"DzWyk24OfpqxWAicRHKlb23ONPK88OlwQhkyglehIZ4",
        "author":"Frank",
        "digest":"Hello world",
        "show_cover_pic":1,
        "content":fs.readFileSync(__dirname+'/test.html','utf8'),
        "content_source_url":"http://www.baidu.com"
      };
      wechatAPI.material.putArticle(appId,article).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  describe('getArticle(appId,mediaId)',function(){
    this.timeout(5000);
    it('should return list',function(done){
      var mediaId='fh0dNaOq3liW91YzYLrmRFiuMM0v_UvizlO-eDBeTJY';
      wechatAPI.material.getArticle(appId,mediaId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });
});


