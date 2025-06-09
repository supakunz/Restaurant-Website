const express = require("express");
const router = express.Router();
const attachRedis = require("../middlewares/attachRedis");

const {
  createFood,
  getAllFoods,
  getFoodID,
  updateFoodID,
  removeFoodID,
} = require("../controllers/food");

// Public
router.get("/getallfoods", attachRedis, getAllFoods);

// Admin only
router.post("/addfood", attachRedis, createFood);
router.get("/getfood/:id", attachRedis, getFoodID);
router.put("/updatefood/:id", attachRedis, updateFoodID);
router.delete("/deletefood/:id", attachRedis, removeFoodID);

module.exports = router;
