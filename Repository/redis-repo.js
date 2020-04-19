const Redis = require('ioredis');
class RedisRepo {
    constructor() {
        this.redisClient = new Redis({
            host: '127.0.0.1',
            port: '6379'
        })
    }
    
    get(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, function(err, reply) {
                if(err) {
                    return reject(err);
                }
                return resolve(reply);
            });
        });
    }
    
    set(key, value) {
        console.log(key, value);
        return new Promise((resolve, reject) => {
            this.redisClient.set(key, value, function(err, reply) {
                console.log(err, reply);
                if(err) {
                    return reject(err);
                }
                return resolve(reply);
            });
        });
    }
    
    addToRequestList(key, value, score) {
        return new Promise((resolve, reject) => {
            this.redisClient.zadd(key, score, value, function(err, reply) {
                if(err) {
                    return reject(err);
                }
                return resolve(reply);
            });
        });
    }
    
    GetAllRequests(key, start, end) {
        return new Promise(async (resolve, reject) => {
            this.redisClient.zrange(key, start, end, function(err, reply) {
                if(err) {
                    return reject(err);
                }
                return resolve(reply);
            });
        });
    }
    
    getPosition(key, value) {
        return new Promise((resolve, reject) => {
            this.redisClient.zrank(key, value, function(err, reply) {
                if(err) {
                    return reject(err);
                }
                return resolve(reply);
            });
        });
    }

    expiry(key, value) {
        return new Promise((resolve, reject) => {
            this.redisClient.expire(key, value, function(err, reply) {
                if(err) {
                    return reject(err);
                }
                return resolve(reply);
            });
        });
    }
    
}

module.exports = RedisRepo;