/**
 * CreateDate 3/18/16
 * Author frank.zhang
 * Description
 */

'use strict';

var appId='wx6ab358829c68dea7';
var wechatAPI=require('wechat/api');

var fs=require('fs');

describe('getMenu(appId)',()=>{
  it('should return buffer',done=>{
    var name='frank.zhang1';
    wechatAPI.account.qrcode(appId,name).then(res=>{
      console.log(res);
      done();
    },err=>{
      done(err);
    })
  })
});