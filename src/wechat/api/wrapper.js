/**
 * CreateDate 4/20/16
 * Author frank.zhang
 * Description
 */

'use strict';

var request = require('request');
var authorization = require('wechat/authorization');
var uuid=require('node-uuid');

/**
 * get wrapper
 * @param baseURI
 * @param appId
 * @param qs
 * @returns {Promise}
 */
module.exports.get = function (baseURI, appId, qs) {
  var promise = new Promise(function (resolve, reject) {
    authorization.getAccessToken(appId).then(function (accessToken) {
      request.get(
        {
          url: baseURI + '?access_token=' + accessToken,
          qs: qs,
          json: true
        },
        function (err, response, body) {
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

/**
 * post wrapper
 * @param baseURI
 * @param appId
 * @param json
 * @returns {Promise}
 */
module.exports.post = function (baseURI, appId, json) {
  var promise = new Promise(function (resolve, reject) {
    authorization.getAccessToken(appId).then(function (accessToken) {
      request.post(
        {
          url: baseURI + '?access_token=' + accessToken,
          json: json
        },
        function (err, response, body) {
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

/**
 * get media wrapper [image]
 * @param baseURI
 * @param appId
 * @param qs
 * @returns {Promise}
 */
module.exports.getMedia = function (baseURI,appId,qs) {
  var promise = new Promise(function (resolve, reject) {
    authorization.getAccessToken(appId).then(function (accessToken) {
      request.get(
        {
          url: baseURI + '?access_token=' + accessToken,
          qs: qs,
          encoding: null
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
          try{
            var suffix = header['content-disposition'].split('.')[1].replace(/\"/g, '');
            var filename = uuid.v1() + '.' + suffix;
            var contentType = header['content-type'];
            var size = Number(header['content-length']);
            resolve({
              filename: filename,
              contentType: contentType,
              size: size,
              buffer: body
            });
          }catch(err){
            reject(err);
          }
        });
    },function (err) {
      reject(err);
    }
    );
  });
  return promise;
};

/**
 * get material wrapper,[image,voice]
 * @param baseURI
 * @param appId
 * @param mediaId
 * @returns {Promise}
 */
module.exports.getMaterial = function (baseURI,appId,mediaId) {
  var promise = new Promise(function (resolve, reject) {
    authorization.getAccessToken(appId).then(function (accessToken) {
      request.post(
        {
          url: baseURI + '?access_token=' + accessToken,
          json:{media_id:mediaId},
          encoding: null
        },
          function (err, response, body) {
            if (err) {
              return reject(err);
            }
            if (body.errcode && body.errcode != 0) {
              return reject(body);
            }
            var header = response.headers;
            try{
              var originalName=header['content-disposition'].split(/filename=/)[1].replace(/\"/g, '');
              var suffix = header['content-disposition'].split('.')[1].replace(/\"/g, '');
              var filename = uuid.v1() + '.' + suffix;
              var size = Number(header['content-length']);
              resolve({
                originalName:originalName,
                filename: filename,
                size: size,
                buffer: body
              });
            }catch(err){
              reject(err);
            }
          });
    },function (err) {
      reject(err);
    }
    );
  });
  return promise;
};
/**
 * post multi wrapper
 * @param baseURI
 * @param appId
 * @param type
 * @param media
 * @returns {Promise}
 */
module.exports.postMulti = function(baseURI,appId,type,media,description) {
  var promise = new Promise(function (resolve, reject) {
    authorization.getAccessToken(appId).then(function (accessToken) {
      var formData={
        media:media
      };
      if(type==='video'){
        formData.description=JSON.stringify(description);
      }
      request.post({
        uri: `${baseURI}?access_token=${accessToken}&type=${type}`,
        formData:formData,
        json: true
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
