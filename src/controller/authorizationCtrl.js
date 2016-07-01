/**
 * CreateDate 1/14/16
 * Author frank.zhang
 * Description
 */

'use strict';
var router =require('express').Router();
var environment=require('config/environment');
var util=require('util');
var authorization=require('wechat/authorization');

/**
 * receive wechat ticket message
 */
var xmlBodyParser = require('express-xml-bodyparser');
var wechatCrypto = require('wechat/wechatCrypto');

router.post('/',xmlBodyParser({trim: false, explicitArray: false}),function(req,res,next){
  var timestamp=req.query.timestamp;
  var nonce=req.query.nonce;
  var msg_signature=req.query.msg_signature;
  var encrypt=req.body.xml.encrypt;
  if (msg_signature !== wechatCrypto.getSignature(timestamp, nonce, encrypt)) {
    return next('invalid signature');
  }
  var decrypted=wechatCrypto.decrypt(encrypt);
  var messageWrapXml=decrypted.message;
  if(!messageWrapXml) {
    return next('component_verify_ticket message error');
  }
  authorization.analysisXmlMessage(messageWrapXml);
  res.send('success');
});

router.get('/url',function(req,res,next){
  var uid=req.query.uid;
  authorization.getPreAuthCode().then(function(pre_auth_code){
    var component_appid=environment.wechat.appId;
    var redirect_uri=environment.baseURI+'/api/wechat/authorization/redirect?uid='+uid;
    var url=util.format('https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid=%s&pre_auth_code=%s&redirect_uri=%s',component_appid,pre_auth_code,redirect_uri);
    res.send(url);
  },function(err){
    next(err);
  });
});

router.get('/redirect',function(req,res,next){
  var auth_code=req.query.auth_code;
  var uid=req.query.uid;
  authorization.getOfficialAccount(uid,auth_code).then(function(result){
    res.redirect('/#admin/wechat/officialAccountInfo?appId='+result.appId);
  },function(err){
    next(err);
  });
});

//todo remote later
router.get('/accessToken',function(req,res,next){
  var appId=req.query.appId;
  authorization.getAccessToken(appId).then(function(accessToken){
    res.send(accessToken);
  },function(err){
    next(err);
  });
});

module.exports = router;
