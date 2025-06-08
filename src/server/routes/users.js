const express = require("express");
const router = express.Router();

const attachRedis = require("../middlewares/attachRedis");
const { protect } = require("../middlewares/authProtect");
const {
  getAllUsers,
  getUsersEmail,
  createUsers,
  loginUsers,
  getUsersID,
  removeUserID,
  updateUserID,
} = require("../controllers/user");

// Public
router.post("/register", attachRedis, createUsers);
router.post("/login", attachRedis, loginUsers);

// Admin only
router.get("/", protect, attachRedis, getUsersEmail);
router.get("/alluser", protect, attachRedis, getAllUsers);
router.get("/userid/:id", protect, attachRedis, getUsersID);
router.put("/userid/:id", protect, attachRedis, updateUserID);
router.delete("/userid/:id", protect, attachRedis, removeUserID);

module.exports = router;
