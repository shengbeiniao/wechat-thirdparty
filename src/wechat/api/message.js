/**
 * CreateDate 4/20/16
 * Author frank.zhang
 * Description
 */

'use strict';

//将微信XML发送消息转换为系统消息对象
module.exports.receive=function(wechatFromMessage){
  var fromMessage={};
  fromMessage.toUserName=wechatFromMessage['ToUserName'];
  fromMessage.fromUserName=wechatFromMessage['FromUserName'];
  fromMessage.createTime=new Date().getTime();
  fromMessage.msgType=wechatFromMessage['MsgType'];
  switch(fromMessage.msgType){
  case 'text':{
    fromMessage.text={};
    fromMessage.text.content=wechatFromMessage['Content'];
    break;
  }
  case 'image':{
    fromMessage.image={};
    fromMessage.image.mediaId=wechatFromMessage['MediaId'];
    fromMessage.image.picUrl=wechatFromMessage['PicUrl'];
    break;
  }
  case 'voice':{
    fromMessage.voice={};
    fromMessage.voice.mediaId=wechatFromMessage['MediaId'];
    fromMessage.voice.format=wechatFromMessage['Format'];
      //语音识别后的文本
    var _=require('lodash');
    if(!_.isEmpty(wechatFromMessage['Recognition'])){
      fromMessage.voice.recognition=wechatFromMessage['Recognition'];
    }
    break;
  }
  case 'video':{
    fromMessage.video={};
    fromMessage.video.mediaId=wechatFromMessage['MediaId'];
    fromMessage.video.thumbMediaId=wechatFromMessage['ThumbMediaId'];
    break;
  }
  case 'shortvideo':{
    fromMessage.shortvideo={};
    fromMessage.shortvideo.mediaId=wechatFromMessage['MediaId'];
    fromMessage.shortvideo.thumbMediaId=wechatFromMessage['ThumbMediaId'];
    break;
  }
  case 'location':{
    fromMessage.location={};
    fromMessage.location.latitude=wechatFromMessage['Location_X'];
    fromMessage.location.longitude=wechatFromMessage['Location_Y'];
    fromMessage.location.precision=wechatFromMessage['Scale'];
    fromMessage.location.label=wechatFromMessage['Label'];
    break;
  }
  case 'link':{
    fromMessage.link={};
    fromMessage.link.title=wechatFromMessage['Title'];
    fromMessage.link.description=wechatFromMessage['Description'];
    fromMessage.link.url=wechatFromMessage['Url'];
    break;
  }
  case 'event':{
    var eventType=wechatFromMessage['Event'].toLowerCase();
    fromMessage.event={};
    fromMessage.event.eventType=eventType;
    switch(eventType){
    case 'subscribe':{
          //自定义参数二维码
      if(wechatFromMessage['Ticket']!==undefined){
        fromMessage.event.eventKey=wechatFromMessage['EventKey'];
        fromMessage.event.ticket=wechatFromMessage['Ticket'];
      }
      break;
    }
    case 'unsubscribe':{
      break;
    }
    case 'scan':{
          //自定义参数二维码
      if(wechatFromMessage['Ticket']!==undefined){
        fromMessage.event.eventKey=wechatFromMessage['EventKey'];
        fromMessage.event.ticket=wechatFromMessage['Ticket'];
      }
      break;
    }
    case 'location':{
      fromMessage.event.latitude=wechatFromMessage['Latitude'];
      fromMessage.event.longitude=wechatFromMessage['Longitude'];
      fromMessage.event.precision=wechatFromMessage['Precision'];
      break;
    }
    case 'click':{
          //keyword
      fromMessage.event.eventKey=wechatFromMessage['EventKey'];
      break;
    }
    case 'view':{
          //url
      fromMessage.event.eventKey=wechatFromMessage['EventKey'];
      break;
    }
    }
    break;
  }
  }
  return fromMessage;
};

var swig=require('swig');
var logger=require('config/logger');
var wechatCrypto = require('wechat/wechatCrypto');
var path=require('path');

//包装并加密自动回复对象，生成XML格式
module.exports.send=function(sendMessage){
  try{
    var wechatSendMessage={};
    wechatSendMessage['ToUserName']=sendMessage.toUserName;
    wechatSendMessage['FromUserName']=sendMessage.fromUserName;
    wechatSendMessage['CreateTime']=sendMessage.createTime;
    wechatSendMessage['MsgType']=sendMessage.msgType;
    switch(sendMessage.msgType){
    case 'text':{
      wechatSendMessage['Content']=sendMessage.text.content;
      break;
    }
    case 'image':{
      wechatSendMessage['MediaId']=sendMessage.image.mediaId;
      break;
    }
    case 'voice':{
      wechatSendMessage['MediaId']=sendMessage.voice.mediaId;
      break;
    }
    case 'video':{
      wechatSendMessage['MediaId']=sendMessage.video.mediaId;
      wechatSendMessage['Title']=sendMessage.video.title;
      wechatSendMessage['Description']=sendMessage.video.description;
      break;
    }
    case 'music':{
      wechatSendMessage['Title']=sendMessage.music.title;
      wechatSendMessage['Description']=sendMessage.music.description;
      wechatSendMessage['MusicUrl']=sendMessage.music.url;
      wechatSendMessage['HQMusicUrl']=sendMessage.music.hqUrl;
      wechatSendMessage['ThumbMediaId']=sendMessage.music.thumbMediaId;
      break;
    }
    case 'news':{
      wechatSendMessage['Count']=sendMessage.articles.length;
      wechatSendMessage['Articles']=sendMessage.articles;
      break;
    }
    }
    var template = swig.compileFile(path.resolve(__dirname+'/../tpl/message.tpl'));
    var xmlSendMessage=template(wechatSendMessage).replace(/>\s*/g, '>');
    var encryptMessage={};
    encryptMessage.encrypt = wechatCrypto.encrypt(xmlSendMessage);
    encryptMessage.nonce = parseInt((Math.random() * 100000000000), 10);
    encryptMessage.timestamp = new Date().getTime();
    encryptMessage.msgSignature = wechatCrypto.getSignature(encryptMessage.timestamp, encryptMessage.nonce, encryptMessage.encrypt);
    var encryptTemplate=swig.compileFile(path.resolve(__dirname+'/../tpl/encrypt.tpl'));
    return encryptTemplate(encryptMessage);
  }catch(err){
    logger.error(err);
    return null;
  }
};

var wrapper=require('./wrapper');

module.exports.chat=function(appId,message){
  var baseURI='https://api.weixin.qq.com/cgi-bin/message/custom/send';
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,message).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

module.exports.getAutoReply=function(appId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/get_current_autoreply_info';
  var promise=new Promise(function(resolve,reject){
    wrapper.get(baseURI,appId).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

module.exports.groupMessage=function(appId,groupMessage){
  var baseURI='https://api.weixin.qq.com/cgi-bin/message/mass/sendall';
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,groupMessage).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};