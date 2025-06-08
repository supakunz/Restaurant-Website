const express = require("express");
const usersRouter = require("./routes/users");
const foodsRouter = require("./routes/food");
const socialRouter = require("./routes/social");

var cors = require("cors");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); // เพื่อแปลงข้อมูลฟอร์ม
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/users", usersRouter);
app.use("/api/foods", foodsRouter);
app.use("/api/auth", socialRouter);

module.exports = app;
