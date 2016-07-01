/**
 * CreateDate 4/20/16
 * Author frank.zhang
 * Description
 */

'use strict';

var account=require('./account');
var customerService=require('./customerService');
var follower=require('./follower');
var material=require('./material');
var menu=require('./menu');
var message=require('./message');

module.exports={
  account:{
    qrcode:account.qrcode
  },
  customerService:{
    add:customerService.add,
    update:customerService.update,
    remove:customerService.remove,
    uploadAvatar:customerService.uploadAvatar,
    getAll:customerService.getAll
  },
  follower:{
    createTag:follower.createTag,
    getTagList:follower.getTagList,
    updateTag:follower.updateTag,
    removeTag:follower.removeTag,
    batchTagging:follower.batchTagging,
    batchCancelTagging:follower.batchCancelTagging,
    getFollowerTags:follower.getFollowerTags,
    setRemark:follower.setRemark,
    getFollowerInfo:follower.getFollowerInfo,
    batchGetFollowerInfo:follower.batchGetFollowerInfo,
    getFollowerList:follower.getFollowerList
  },
  material:{
    putMedia:material.putMedia,
    getMedia:material.getMedia,
    putArticle:material.putArticle,
    putArticleImage:material.putArticleImage,
    putMaterial:material.putMaterial,
    getArticle:material.getArticle,
    getVideo:material.getVideo,
    getMaterial:material.getMaterial,
    removeMaterial:material.removeMaterial,
    updateArticle:material.updateArticle,
    getMaterialCount:material.getMaterialCount,
    getMaterialList:material.getMaterialList
  },
  menu:{
    update:menu.update,
    getMenu:menu.getMenu,
    remove:menu.remove
  },
  message:{
    receive:message.receive,
    send:message.send,
    chat:message.chat,
    getAutoReply:message.getAutoReply,
    groupMessage:message.groupMessage
  }
};
