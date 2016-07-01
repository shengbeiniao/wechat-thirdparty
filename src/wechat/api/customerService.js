/**
 * CreateDate 6/7/16
 * Author frank.zhang
 * Description
 */

'use strict';

var wrapper=require('./wrapper');
var request = require('request');
var authorization = require('wechat/authorization');

/**
 *
 * @param appId
 * @param account
 * @param nickname
 * @param password
 * @returns {Promise}
 */
module.exports.add=function(appId,account,nickname,password){
  var baseURI='https://api.weixin.qq.com/customservice/kfaccount/add';
  var json={
    kf_account:account,
    nickname:nickname,
    password:password
  };
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,json).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};


module.exports.update=function(appId,account,nickname,password){
  var baseURI='https://api.weixin.qq.com/customservice/kfaccount/update';
  var json={
    kf_account:account,
    nickname:nickname,
    password:password
  };
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,json).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

module.exports.remove=function(appId,account,nickname,password){
  var baseURI='https://api.weixin.qq.com/customservice/kfaccount/del';
  var json={
    kf_account:account,
    nickname:nickname,
    password:password
  };
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,json).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

module.exports.uploadAvatar=function(appId,account,media){
  var promise = new Promise(function (resolve, reject) {
    authorization.getAccessToken(appId).then(function (accessToken) {
      var url=`https://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?access_token=${accessToken}&kf_account=${account}`;
      request.post({
        url: url,
        formData:{
          media:media
        }
      }, function (err, response, body) {
        if (err) {
          return reject(err);
        }
        if (body.errcode && body.errcode != 0) {
          return reject(body);
        }
        resolve(body);
      });
    }, function (err) {
      reject(err);
    });
  });
  return promise;
};

module.exports.getAll=function(appId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/customservice/getkflist';
  var promise=new Promise(function(resolve,reject){
    wrapper.get(baseURI,appId).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};
