/**
 * CreateDate 1/14/16
 * Author frank.zhang
 * Description
 */

'use strict';

var config={
  redis:{
    host:'localhost',
    port:6379
  }
};

var redis = require('redis');
var logger=require('./logger');
var redisClient = redis.createClient(config.redis);

redisClient.on('error', function (err) {
  logger.error(err);
});

module.exports=redisClient;
