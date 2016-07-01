/**
 * CreateDate 3/18/16
 * Author frank.zhang
 * Description
 */

'use strict';

var wechatAPI=require('wechat/api');

var appId='wx6ab358829c68dea7';
var openId='oTP7sw0_txBIM-AW2GmtjlkhtUuI';

require('config/mongoClient');

describe('wechatAPI/follower',()=>{
  /*
   { id: 115, name: 'shanghai' }
   */
  describe('createTag(appId,name)',()=>{
    it('should return tag id',done=>{
      var name='beijing';
      wechatAPI.follower.createTag(appId,name).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    })
  });

  /*
   { id: 1, name: '黑名单', count: 0 },
   { id: 2, name: '星标组', count: 0 },
   { id: 115, name: 'beijing', count: 0 } ]
   */
  describe('getTagList(appId)',()=>{
    it('should return list',done=>{
      wechatAPI.follower.getTagList(appId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    })
  });

  /*
   { errcode: 0, errmsg: 'ok' }
   */
  describe('updateTag(appId,tagId,newName)',()=>{
    it('should return ok',done=>{
      var tagId='115';
      var newName='beijing';
      wechatAPI.follower.updateTag(appId,tagId,newName).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    })
  });

  /*
   { errcode: 0, errmsg: 'ok' }
   */
  describe('removeTag(appId,tagId)',()=>{
    it('should return ok',done=>{
      var tagId='115';
      wechatAPI.follower.removeTag(appId,tagId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    })
  });

  /*
   { errcode: 0, errmsg: 'ok' }
   */
  describe('batchTagging(appId,openIdList,tagId)',()=>{
    it('should return ok',done=>{
      var openIdList=[];
      openIdList.push(openId);
      var tagId='2';
      wechatAPI.follower.batchTagging(appId,openIdList,tagId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    })
  });

  /*
   { errcode: 0, errmsg: 'ok' }
   */
  describe('batchCancelTagging(appId,openIdList,tagId)',()=>{
    it('should return ok',done=>{
      var openIdList=[];
      openIdList.push(openId);
      var tagId='116';
      wechatAPI.follower.batchCancelTagging(appId,openIdList,tagId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    })
  });

  /*
   [ 116 ]
   */
  describe('getFollowerTags(appId,openId)',()=>{
    it('should return tag id',done=>{
      wechatAPI.follower.getFollowerTags(appId,openId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    })
  });

  /*
   { errcode: 0, errmsg: 'ok' }
   */
  describe('setRemark(appId,openId,remark)',()=>{
    it('should return ok',done=>{
      var remark='Be happy!';
      wechatAPI.follower.setRemark(appId,openId,remark).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    })
  });

  /*
   { subscribe: 1,
   openid: 'oTP7sw0_txBIM-AW2GmtjlkhtUuI',
   nickname: '三直',
   sex: 1,
   language: 'zh_CN',
   city: 'Hongkou',
   province: 'Shanghai',
   country: 'China',
   headimgurl: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEJWh494UHPUepa8RlX6w9rNsrXjFa40oZZeR5BmicwslZ2KSMEnibr6icUic0KZD62CnxTsR0x2AUGPHw/0',
   subscribe_time: 1464083399,
   unionid: 'o5CAAtzL8gWszqQgqTkpRCtsCvbw',
   remark: '',
   groupid: 0,
   tagid_list: [] }
   */
  describe('getFollowerInfo(appId,openId,lang)',()=>{
    it('should return json',done=>{
      var lang='en';
      var Follower=require('model/wechat/Follower');
      wechatAPI.follower.getFollowerInfo(appId,openId,lang).then(res=>{
        var openId = res.openid;
        Follower.update(
          {
            openId: openId
          },
          {
            appId:appId,
            openId:openId,
            nickName:res.nickname,
            sex:res.sex,
            language:res.language,
            city:res.city,
            province:res.province,
            country:res.country,
            avatar:res.headimgurl,
            unionId:res.unionid?res.unionid:null,
            remark:res.remark,
            groupId:res.groupid,
            subscribeTime:new Date().getTime(),
            tagIdList:res.tagid_list
          },
          {
            upsert: true,
            setDefaultsOnInsert: true
          },result=>{
            done();
          }, err=> {
            done(err);
          }
        );
      },err=>{
        done(err);
      })
    })
  });

  /*
   [ { subscribe: 1,
   openid: 'oTP7sw0_txBIM-AW2GmtjlkhtUuI',
   nickname: '三直',
   sex: 1,
   language: 'zh_CN',
   city: 'Hongkou',
   province: 'Shanghai',
   country: 'China',
   headimgurl: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEJWh494UHPUepa8RlX6w9rNsrXjFa40oZZeR5BmicwslZ2KSMEnibr6icUic0KZD62CnxTsR0x2AUGPHw/0',
   subscribe_time: 1461231044,
   unionid: 'o5CAAtzL8gWszqQgqTkpRCtsCvbw',
   remark: 'Be happy!',
   tagid: 0 } ]
   */
  describe('batchGetFollowerInfo(appId,openIdList,lang)',()=>{
    it('should return list',done=>{
      var openIdList=[];
      openIdList.push(openId);
      var lang='en';
      wechatAPI.follower.batchGetFollowerInfo(appId,openIdList,lang).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    })
  });

  /*

   { total: 22,
   count: 22,
   data:
   { openid:
   [ 'oTP7sw9ad-cgXnEhkkkShd8Xy3n8',
   'oTP7sw_dEdl-T8YJyR9suUTYigD0',
   'oTP7sw215Exw_z9HA6V_Xmx67bvw',
   'oTP7sw0_txBIM-AW2GmtjlkhtUuI',
   'oTP7sw6dUmX8LCx5xcPr7iqQAdKs',
   'oTP7sw0taSyeexcwZVQUq-Pvit4E',
   'oTP7sw5HyaB_72_XZfvAlc4h7Fgw',
   'oTP7sw-g_cDijsI7jeOGKts2qtts',
   'oTP7sw1lgnI6ghiwqIPqnqExghxk',
   'oTP7sw8wYCdEgmiqT8zQyYrKfeDs',
   'oTP7sww_7InMeANx8IwcREmzS4-E',
   'oTP7sw0XeMTvcDukyV5l7nZSRMbs',
   'oTP7sw6ucbLIluLGsAHTX4oTphYs',
   'oTP7sw_dIaAul65nqgc1Jy5dQLkU',
   'oTP7sw_SPWe5s29-d8DNMm2amp60',
   'oTP7sw0DI_KWsGLHby17oNMIHDeI',
   'oTP7sw6Fq4d5HJmVjK0YwizO_VyU',
   'oTP7sw3XB1GsVl66S_vPZuI1OZfY',
   'oTP7sw9IC5lVrVtVbuIiZrwvuyz8',
   'oTP7sw7R29TkOu9v-sCqEdRSs8Uc',
   'oTP7sw_stnIZcc9gg65HC-1rahdk',
   'oTP7swys4bE1nu3iFiImz_nfL8G0' ] },
   next_openid: 'oTP7swys4bE1nu3iFiImz_nfL8G0' }
   */
  describe('getFollowerList(appId,nextOpenId)',()=>{
    it('should return list',done=>{
      var nextOpenId='oTP7swys4bE1nu3iFiImz_nfL8G0';
      wechatAPI.follower.getFollowerList(appId,nextOpenId).then(res=>{
        console.log(res);
        done();
      },err=>{
        done(err);
      })
    })
  });
});
