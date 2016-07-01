/**
* CreateDate 4/20/16
* Author frank.zhang
* Description
*/

'use strict';

var wrapper=require('./wrapper');
// var Follower=require('model/wechat/Follower');

/**
* create follower tag,max:100
* @param appId
* @param name
* @returns {Promise}
*/
module.exports.createTag=function(appId,name){
  var baseURI='https://api.weixin.qq.com/cgi-bin/tags/create';
  var json={
    tag:{
      name:name
    }
  };
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,json).then(function(res){
      resolve(res.tag);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
* get follower tag list
* @param appId
* @returns {Promise}
*/
module.exports.getTagList=function(appId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/tags/get';
  var promise=new Promise(function(resolve,reject){
    wrapper.get(baseURI,appId,null).then(function(res){
      if(res!==null){
        resolve(res.tags);
      }else{
        resolve(null);
      }
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
* change tag name
* @param appId
* @param tagId
* @param newName
* @returns {Promise}
*/
module.exports.updateTag=function(appId,tagId,newName){
  var baseURI='https://api.weixin.qq.com/cgi-bin/tags/update';
  var json={
    tag:{
      id:tagId,
      name:newName
    }
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

/**
* remove tag
* @param appId
* @param tagId
*/
module.exports.removeTag=function(appId,tagId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/tags/delete';
  var json={
    tag:{
      id:tagId
    }
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

/**
* batch tagging to follower,one follower support 3 tags,one request can send max 50 followers
* @param appId
* @param openIdList
* @param tagId
*/
module.exports.batchTagging=function(appId,openIdList,tagId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging';
  var json={
    openid_list:openIdList,
    tagid:tagId
  };
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,json).then(function(res){
      // Follower.update(
      //   {appId:appId, openId: { $in: openIdList}},
      //   { $push: { 'tagIdList': { number: tagId } } },
      //   {safe: true, upsert: true, new : true},
      //   function(err) {
      //     if(err) {
      //       return reject(err);
      //     }
      resolve(res);
      //   }
      // );
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
* batch cancel tagging for follower,one request can send max 50 followers
* @param appId
* @param openIdList
* @param tagId
* @returns {Promise}
*/
module.exports.batchCancelTagging=function(appId,openIdList,tagId){
  // console.log('batchCancelTagging', appId, openIdList);
  var baseURI='https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging';
  var json={
    openid_list:openIdList,
    tagid:tagId
  };
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,json).then(function(res){
      // Follower.update(
      //   {appId:appId, openId: { $in: openIdList}},
      //   { $pull: { 'tagIdList': tagId } },
      //   {safe: true, upsert: true, new : true},
      //   function(err) {
      //     if(err) {
      //       return reject(err);
      //     }
      resolve(res);
      //   }
      // );

    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
* use openId get tagId
* @param appId
* @param openId
* @returns {Promise}
*/
module.exports.getFollowerTags=function(appId,openId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/tags/getidlist';
  var json={
    openid:openId
  };
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,json).then(function(res){
      resolve(res.tagid_list);
    },function(err){
      reject(err);
    });
  });
  return promise;
};


/**
* set follower remark
* @param appId
* @param openId
* @param remark length<30
*/
module.exports.setRemark=function(appId,openId,remark){
  var baseURI='https://api.weixin.qq.com/cgi-bin/user/info/updateremark';
  var json={
    openid:openId,
    remark:remark
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

/**
* get follower information
* @param appId
* @param openId
* @returns {Promise}
*/
module.exports.getFollowerInfo=function(appId,openId,lang){
  var baseURI='https://api.weixin.qq.com/cgi-bin/user/info';
  if(!lang){
    lang='zh_CN';
  }
  var qs={
    openid:openId,
    lang:lang
  };
  var promise=new Promise(function(resolve,reject){
    wrapper.get(baseURI,appId,qs).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
* batch get follower info,max 100
* @param appId
* @param followerList Array,[{openId,lang}],lang:[zh_CN,zh_TW,en],default zh_CN
* @returns {Promise}
*/
module.exports.batchGetFollowerInfo=function(appId,openIdList,lang){
  var baseURI='https://api.weixin.qq.com/cgi-bin/user/info/batchget';
  if(!lang){
    lang='zh_CN';
  }
  var userList=[];
  openIdList.forEach(function(openId){
    var user={};
    user.openid=openId;
    user.lang=lang;
    userList.push(user);
  });
  var json={
    user_list:userList
  };
  var promise=new Promise(function(resolve,reject){
    wrapper.post(baseURI,appId,json).then(function(res){
      if(res!==null){
        resolve(res.user_info_list);
      }else{
        return null;
      }
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
* get follower list
* @param appId
* @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
* @returns {Promise}
*/
module.exports.getFollowerList=function(appId,nextOpenId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/user/get';
  var qs={
    next_openid:nextOpenId
  };
  var promise=new Promise(function(resolve,reject){
    wrapper.get(baseURI,appId,qs).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};
//todo
//upload follower location
