const redis = require("redis");

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.connect();

redisClient.on("error", function(error) {
})

redisClient.on("ready", () => {
})

redisClient.on("connect", () => {
  console.log('✅ 💃 App ready on http:\/\/localhost:3001 !')
})

module.exports = redisClient;