/**
 * CreateDate 4/27/16
 * Author frank.zhang
 * Description
 */

'use strict';

var wechatAPI = require('wechat/api');
var appId='wx6ab358829c68dea7';
var fs=require('fs');
/*
 [ { kf_account: 'kf2001@ff_test',
 kf_headimgurl: 'http://mmbiz.qpic.cn/mmbiz/Imjq6FyPKUzsmoYjQ34EjPVcZl8rGmn9PatdiaDLo7tm0DibPrHQOial9ho3bZJsanfEicvLKSpuwcibKon5ywdSW1w/300?wx_fmt=jpeg',
 kf_id: 2001,
 kf_nick: 'Frank.Zhang',
 kf_wx: 'shengbeiniao' },
 { kf_account: 'frank1@fftest',
 kf_headimgurl: '',
 kf_id: 2002,
 kf_nick: 'frank1' },
 { kf_account: 'frank1@ff',
 kf_headimgurl: '',
 kf_id: 2003,
 kf_nick: 'frank1' } ]
 */
describe('wechatAPI/customerService', function () {
  describe('add(appId,account,nickname,password)', function () {
    it('should return success', function (done) {
      var account='frank1@ff';
      var nickname='frank1';
      var password='123123123';
      wechatAPI.customerService.add(appId,account,nickname,password).then(result=>{
        console.log(result);
        done();
      },err=>{
        done(err);
      })
    });
  });

  describe('uploadAvatar(appId,account,media)', function () {
    it('should return success', function (done) {
      this.timeout(5000);
      var path=__dirname+'/media/z.jpg';
      var buffer=fs.readFileSync(path);
      var media= {
        value:buffer,
        options: {
          filename: 'z.jpg',
          contentType: 'image/jpg'
        }
      };
      var account='frank1@ff';
      wechatAPI.customerService.uploadAvatar(appId,account,media).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    });
  });

  describe('getAll(appId)', function () {
    it('should return list', function (done) {
      wechatAPI.customerService.getAll(appId).then(result=>{
        console.log(result);
        done();
      },err=>{
        done(err);
      })
    });
  });
});
