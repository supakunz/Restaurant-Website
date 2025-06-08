require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis"); // 👈 เพิ่มไฟล์เชื่อม Redis

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB(); // เชื่อม PostgreDB
    await connectRedis(); // เชื่อม Redis

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
