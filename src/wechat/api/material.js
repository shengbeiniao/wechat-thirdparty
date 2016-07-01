/**
 * CreateDate 4/20/16
 * Author frank.zhang
 * Description
 */

'use strict';

var wrapper=require('./wrapper');

/**
 * put media,3days
 * @param appId
 * @param type image:2M,bmp/png/jpeg/jpg;
 * @param media
 * @returns {Promise}
 */
module.exports.putMedia=function(appId,type,media){
  var baseURI='https://api.weixin.qq.com/cgi-bin/media/upload';
  var promise=new Promise(function(resolve,reject){
    wrapper.postMulti(baseURI,appId,type,media).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
 * get media,temp 3 days
 * @param appId
 * @param mediaId
 * @returns {Promise}
 */
module.exports.getMedia=function(appId,mediaId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/media/get';
  var qs={
    media_id:mediaId
  };
  var promise=new Promise(function(resolve,reject){
    wrapper.getMedia(baseURI,appId,qs).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
 * put article,limit 1,max 10
 * @param appId
 * @param article
 * @returns {Promise}
 */
module.exports.putArticle=function(appId,article){
  var baseURI='https://api.weixin.qq.com/cgi-bin/material/add_news';
  var articles=[];
  articles.push(article);
  var json={'articles':articles};
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
 * put article image
 * @param appId
 * @param media jpg/png 1M
 * @returns {Promise}
 */
module.exports.putArticleImage=function(appId,media){
  var baseURI='https://api.weixin.qq.com/cgi-bin/media/uploadimg';
  var promise=new Promise(function(resolve,reject){
    wrapper.postMulti(baseURI,appId,null,media).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
 * put material
 * @param appId
 * @param type image:2M,bmp/png/jpeg/jpg/gif;voice:5M,60s;video:20M;thumb:64KB,jpg
 * @param media
 * @returns {Promise}
 */
module.exports.putMaterial=function(appId,type,media,description){
  var baseURI='https://api.weixin.qq.com/cgi-bin/material/add_material';
  var promise=new Promise(function(resolve,reject){
    wrapper.postMulti(baseURI,appId,type,media,description).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
 * get article
 * @param appId
 * @param mediaId
 * @returns {Promise}
 */
module.exports.getArticle=function(appId,mediaId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/material/get_material';
  var json={
    media_id:mediaId
  };
  var promise=new Promise((resolve,reject)=>{
    wrapper.post(baseURI,appId,json).then(result=>{
      if(result!==null){
        resolve(result.news_item);
      }else{
        resolve(null);
      }
    },err=>{
      reject(err);
    });
  });
  return promise;
};

/**
 * get video
 * @param appId
 * @param mediaId
 * @returns {Promise} download url
 */
module.exports.getVideo=function(appId,mediaId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/material/get_material';
  var json={
    media_id:mediaId
  };
  var promise=new Promise((resolve,reject)=>{
    wrapper.post(baseURI,appId,json).then(result=>{
      resolve(result);
    },err=>{
      reject(err);
    });
  });
  return promise;
};

/**
 * get material
 * @param appId
 * @param type
 * @param mediaId
 * @returns {Promise}
 */
module.exports.getMaterial=function(appId,mediaId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/material/get_material';
  var promise=new Promise(function(resolve,reject){
    wrapper.getMaterial(baseURI,appId,mediaId).then(function(res){
      resolve(res);
    },function(err){
      reject(err);
    });
  });
  return promise;
};

/**
 * remove material
 * @param appId
 * @param mediaId
 */
module.exports.removeMaterial=function(appId,mediaId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/material/del_material';
  var json={
    media_id:mediaId
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
 * update article
 * @param appid
 * @param article
 */
module.exports.updateArticle=function(appId,mediaId,article,index){
  var baseURI='https://api.weixin.qq.com/cgi-bin/material/update_news';
  if(!index){
    index=0;
  }
  var json={
    media_id:mediaId,
    index:index,
    articles:article
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
 * get material count
 * @param appId
 */
module.exports.getMaterialCount=function(appId){
  var baseURI='https://api.weixin.qq.com/cgi-bin/material/get_materialcount';
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
 * get material list
 * @param appId
 * @param type
 * @param start
 */
module.exports.getMaterialList=function(appId,type,offset,count){
  var baseURI='https://api.weixin.qq.com/cgi-bin/material/batchget_material';
  if(!offset){
    offset=0;
  }
  if(!count){
    count=20;
  }
  var json={
    type:type,
    offset:offset,
    count:count
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