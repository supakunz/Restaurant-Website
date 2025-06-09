const express = require("express");
const router = express.Router();

const attachRedis = require("../middlewares/attachRedis");
// const { protect } = require("../middlewares/authProtect");
const { socialLogin } = require("../controllers/social");

// Public
router.post("/social-login", attachRedis, socialLogin);

module.exports = router;
