/**
* CreateDate 1/15/16
* Author frank.zhang
* Description
*/

'use strict';

var request=require('request');
var xml2json=require('xml2json');
var redisClient=require('config/redisClient');
var environment=require('config/environment');
var logger=require('config/logger');

//todo handle wechat event
var analysisXmlMessage=function(messageWrapXml){
  var message=xml2json.toJson(messageWrapXml,{object:true}).xml;
  var appId;
  switch (message.InfoType){
  case 'component_verify_ticket':{
      //verify ticket,refresh every 10mins
    redisClient.set('wechat.componentVerifyTicket',message.ComponentVerifyTicket,err=>{
      if(err){
        logger.error(err);
      }
    });
    break;
  }
  case 'authorized':{
    appId=message.AuthorizerAppid;
    break;
  }
  case 'unauthorized':{
    appId=message.AuthorizerAppid;
    break;
  }
  case 'updateauthorized':{
    appId=message.AuthorizerAppid;
    break;
  }
  }
  logger.info('appId: ' + appId);
};

/**
* Step2
* Get wechat component accessToken
*/
var requestNewComponentAccessToken=function(){
  var promise=new Promise(function(resolve,reject){
    redisClient.get('wechat.componentVerifyTicket',function(err,component_verify_ticket){
      if(err){
        return reject(err);
      }
      if(component_verify_ticket===null){
        return reject('wechat component_verify_ticket is null');
      }
      request.post(
        {
          url: 'https://api.weixin.qq.com/cgi-bin/component/api_component_token',
          json: {
            'component_appid': environment.wechat.appId,
            'component_appsecret': environment.wechat.appSecret,
            'component_verify_ticket': component_verify_ticket
          }
        },
        function(err,response,body){
          if(err){
            return reject(err);
          }
          if (body.errcode && body.errcode != 0) {
            return reject(body);
          }
          var componentAccessToken=body.component_access_token;
          redisClient.set('wechat.componentAccessToken',componentAccessToken,function(err){
            if(err){
              return reject(err);
            }
            //2hours expire
            redisClient.expire('wechat.componentAccessToken',body.expires_in-100,function(err){
              if(err){
                return reject(err);
              }
            });
          });
          resolve(componentAccessToken);
        });
    });
  });
  return promise;
};

var getComponentAccessToken=function(){
  var promise=new Promise(function(resolve,reject){
    redisClient.get('wechat.componentAccessToken',function(err,componentAccessToken){
      if(err){
        return reject(err);
      }
      if(componentAccessToken!==null){
        resolve(componentAccessToken);
      }else{
        requestNewComponentAccessToken().then(function(componentAccessToken){
          resolve(componentAccessToken);
        },function(err){
          reject(err);
        });
      }
    });
  });
  return promise;
};

  /**
  * Step3
  * Get PreAuthCode
  */
var getPreAuthCode=function(){
  var promise=new Promise(function(resolve,reject){
    getComponentAccessToken().then(function(component_access_token){
      request.post(
        {
          url: 'https://api.weixin.qq.com/cgi-bin/component/api_create_preauthcode?component_access_token='+component_access_token,
          json: {
            'component_appid': environment.wechat.appId
          }
        },
          function(err,response,body){
            if(err){
              return reject(err);
            }
            if (body.errcode && body.errcode != 0) {
              return reject(body);
            }
            var pre_auth_code=body.pre_auth_code;
            resolve(pre_auth_code);
          });
    },function(err){
      reject(err);
    });
  });
  return promise;
};

    /**
    * Step4
    * Get Official Account Info
    */
var OfficialAccount=require('model/wechat/OfficialAccount');

var authorization_info;

var saveOfficialAccount=function(creator,appId,refreshToken){
  var promise=new Promise(function(resolve,reject){
    getComponentAccessToken().then(function(component_access_token){
      request.post(
        {
          url: 'https://api.weixin.qq.com/cgi-bin/component/api_get_authorizer_info?component_access_token='+component_access_token,
          json: {
            'component_appid': environment.wechat.appId,
            'authorizer_appid':appId
          }
        },
            function(err,response,body){
              if(err){
                return reject(err);
              }
              if (body.errcode && body.errcode != 0) {
                return reject(body);
              }
              //persistent
              OfficialAccount.findOne({
                appId:appId
              },function(err,result){
                if(err){
                  return reject(err);
                }
                var authorizer_info=body.authorizer_info;
                //权限集
                var privilegeSet=[];
                authorization_info=body.authorization_info;
                var func_info=authorization_info.func_info;
                func_info.forEach(function(obj){
                  privilegeSet.push(obj.funcscope_category.id);
                });
                privilegeSet.sort(function(a,b){
                  return a-b;
                });
                var officialAccount=result;
                if(officialAccount===null){
                  officialAccount=new OfficialAccount({
                    appId:appId,
                    name:authorizer_info.nick_name,
                    originalId:authorizer_info.user_name,
                    avatar:authorizer_info.head_img,
                    serviceType:authorizer_info.service_type_info.id,
                    verifyType:authorizer_info.verify_type_info.id,
                    alias:authorizer_info.alias,
                    businessInfo:authorizer_info.business_info,
                    qrcodeUrl:authorizer_info.qrcode_url,
                    refreshToken:refreshToken,
                    privilegeSet:privilegeSet,
                    creator:creator,
                    watchers:[creator],
                    isActive:true
                  });
                }else{
                  officialAccount.name=authorizer_info.nick_name;
                  officialAccount.avatar=authorizer_info.head_img;
                  officialAccount.verifyType=authorizer_info.verify_type_info.id;
                  officialAccount.alias=authorizer_info.alias;
                  officialAccount.businessInfo=authorizer_info.business_info;
                  officialAccount.qrcodeUrl=authorizer_info.qrcode_url;
                  officialAccount.refreshToken=refreshToken;
                  officialAccount.privilegeSet=privilegeSet;
                  officialAccount.isActive=true;
                }
                officialAccount.save(function(err,result){
                  if(err){
                    return reject(err);
                  }
                  resolve(result);
                });
              });
            });
    },function(err){
      reject(err);
    });
  });
  return promise;
};

var getTestAccessToken=function(auth_code){
  var promise=new Promise(function(resolve,reject){
    getComponentAccessToken().then(function(component_access_token){
      request.post(
        {
          url: 'https://api.weixin.qq.com/cgi-bin/component/api_query_auth?component_access_token='+component_access_token,
          json: {
            'component_appid': environment.wechat.appId,
            'authorization_code':auth_code
          }
        },
              function(err,response,body){
                if(err){
                  return reject(err);
                }
                if (body.errcode && body.errcode != 0) {
                  return reject(body);
                }
                resolve({
                  appId:authorization_info.authorizer_appid,
                  accessToken:authorization_info.authorizer_access_token
                });
              });
    },function(err){
      reject(err);
    });
  });
  return promise;
};

var getOfficialAccount=function(creator,auth_code){
  var promise=new Promise(function(resolve,reject){
    getComponentAccessToken().then(function(component_access_token){
      request.post(
        {
          url: 'https://api.weixin.qq.com/cgi-bin/component/api_query_auth?component_access_token='+component_access_token,
          json: {
            'component_appid': environment.wechat.appId,
            'authorization_code':auth_code
          }
        },
                function(err,response,body){
                  if(err){
                    return reject(err);
                  }
                  if (body.errcode && body.errcode != 0) {
                    return reject(body);
                  }
                  var authorization_info=body.authorization_info;
                  var appId=authorization_info.authorizer_appid;
                  var refreshToken=authorization_info.authorizer_refresh_token;
                  var accessToken=authorization_info.authorizer_access_token;
                  var expire=authorization_info.expires_in;
                  redisClient.set(`wechat.${appId}.accessToken`,accessToken,function(err){
                    if(err){
                      return reject(err);
                    }
                    redisClient.expire(`wechat.${appId}.accessToken`,expire-100,function(err){
                      if(err){
                        return reject(err);
                      }
                    });
                  });
                  redisClient.set(`wechat.${appId}.refreshToken`,refreshToken,function(err){
                    if(err){
                      return reject(err);
                    }
                  });
                  saveOfficialAccount(creator,appId,refreshToken).then(function(result){
                    resolve(result);
                  },function(err){
                    reject(err);
                  });
                });
    },function(err){
      reject(err);
    });
  });
  return promise;
};

          /**
          * Step5
          * Refrech Official Account AccessToken
          */
var requestNewAccessToken=function(appId,refreshToken){
  var promise=new Promise(function(resolve,reject){
    getComponentAccessToken().then(function(component_access_token){
      request.post(
        {
          url: 'https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token?component_access_token='+component_access_token,
          json: {
            'component_appid': environment.wechat.appId,
            'authorizer_appid':appId,
            'authorizer_refresh_token':refreshToken
          }
        },
                  function(err,response,body){
                    if(err){
                      return reject(err);
                    }
                    if (body.errcode && body.errcode != 0) {
                      return reject(body);
                    }
                    var accessToken=body.authorizer_access_token;
                    var expire=body.expires_in;
                    redisClient.set(`wechat.${appId}.accessToken`,accessToken,function(err){
                      if(err){
                        return reject(err);
                      }
                      redisClient.expire(`wechat.${appId}.accessToken`,expire-100,function(err){
                        if(err){
                          return reject(err);
                        }
                      });
                    });
                    resolve(accessToken);
                  });
    },function(err){
      reject(err);
    });
  });
  return promise;
};

var getRefreshToken=function(appId){
  var promise=new Promise(function(resolve,reject){
    redisClient.get(`wechat.${appId}.refreshToken`,function(err,refreshToken){
      if(err){
        return reject(err);
      }
      if(refreshToken!==null){
        resolve(refreshToken);
      }else{
        OfficialAccount.findOne({
          appId:appId
        }).select('refreshToken').exec(function(err,result){
          if(err){
            return reject(err);
          }
          if(result!==null){
            var refreshToken=result.refreshToken;
            redisClient.set(`wechat.${appId}.refreshToken`,refreshToken,function(err){
              if(err){
                return reject(err);
              }
              resolve(refreshToken);
            });
          }else{
            return reject('not bind official account');
          }
        });
      }
    });
  });
  return promise;
};

var getAccessToken=function(appId){
  var promise=new Promise(function(resolve,reject){
    redisClient.get(`wechat.${appId}.accessToken`,(err,accessToken)=>{
      if(err){
        return reject(err);
      }
      if(accessToken!==null){
        resolve(accessToken);
      }else{
        getRefreshToken(appId).then(refreshToken=>{
          requestNewAccessToken(appId,refreshToken).then(function(accessToken){
            resolve(accessToken);
          },function(err){
            reject(err);
          });
        },err=>{
          reject(err);
        });
      }
    });
  });
  return promise;
};

//todo 获取/设置授权费的选项设置信息

module.exports={
  getTestAccessToken:getTestAccessToken,
  analysisXmlMessage:analysisXmlMessage,
  getPreAuthCode:getPreAuthCode,
  getOfficialAccount:getOfficialAccount,
  getAccessToken:getAccessToken
};
