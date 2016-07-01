/**
 * CreateDate 4/25/16
 * Author frank.zhang
 * Description
 */

'use strict';

var wrapper=require('./wrapper');

/**
 * create or update menu
 * @param appId
 * @param menu
 * @returns {Promise}
 */
module.exports.update=function(appId,menu){
  var baseURI='https://api.weixin.qq.com/cgi-bin/menu/create';
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,menu).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
 * get custom menu config
 * @param appId
 * @returns {Promise}
 */
module.exports.getMenu=function(appId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/menu/get';
  var promise=new Promise(function(resolve,reject){
    wrapper.get(baseURI,appId,null).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
 * remote custom menu
 * @param appId
 */
module.exports.remove=function(appId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/menu/delete';
  var promise=new Promise(function(resolve,reject){
    wrapper.get(baseURI,appId,null).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

//todo
//custom menu for different group
