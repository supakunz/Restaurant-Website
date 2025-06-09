const { getRedisClient } = require("../config/redis");

const attachRedis = (req, res, next) => {
  try {
    req.redis = getRedisClient(); // เพิ่ม property redis ให้กับ req
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = attachRedis;
