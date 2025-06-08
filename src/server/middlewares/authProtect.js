const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]; // ส่งมากับ header --> ชื่อ

    // * ตรวจสอบว่ามี header แนบมาไหม
    if (!authHeader) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    authToken = authHeader.split(" ")[1];
    // * ตรวจสอบว่า token ถูกต้องไหม
    const user = jwt.verify(authToken, process.env.SECRET_KEY); // ถ้าไม่ถูกจะ throw error เลย

    // แนบ user เข้า req.user
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
};
