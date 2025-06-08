const redis = require("redis");

let redisClient;

//** Redis Connect **
const connectRedis = async () => {
  redisClient = redis.createClient({
    // data จาก Redis could
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  redisClient.on("error", (err) => console.error("Redis Client Error", err));

  await redisClient.connect();
  console.log("Connected to Redis");
};

// ✅ Export ทั้งฟังก์ชัน connectRedis และ instance redisClient ผ่าน getter
module.exports = {
  connectRedis,
  getRedisClient: () => redisClient,
};
