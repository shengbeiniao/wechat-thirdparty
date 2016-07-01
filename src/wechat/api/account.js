/**
 * CreateDate 5/12/16
 * Author frank.zhang
 * Description
 */

'use strict';

var request=require('request');
var uuid=require('node-uuid');
var wrapper=require('./wrapper');

/**
 * create custom qrcode
 * @param appId
 * @param key
 * @returns {Promise}
 */
module.exports.qrcode=function(appId,key){
  var baseURI='https://api.weixin.qq.com/cgi-bin/qrcode/create';
  var json={'action_name':'QR_LIMIT_STR_SCENE','action_info':{'scene':{'scene_str': key}}};
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,json).then(function(res){
      var ticket=res.ticket;
      var url='https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+ticket;
      request.get(
        {
          url:url,
          encoding:null
        },
        function (err, response, body) {
          if (err) {
            return reject(err);
          }
          var header = response.headers;
          if (header['content-type'] === 'text/plain') {
            var StringDecoder = require('string_decoder').StringDecoder;
            var decoder = new StringDecoder('utf8');
            var errMsg = decoder.write(body);
            return reject(errMsg);
          }
          var suffix = header['content-type'].split('/')[1];
          var filename = uuid.v1() + '.' + suffix;
          resolve({
            ticket:ticket,
            filename: filename,
            buffer:body
          });
        }
      );
    },function(err){
      reject(err);
    });
  });
  return promise;
};
