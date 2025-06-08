const jwt = require("jsonwebtoken"); //สำหรับการเข้ารหัสข้อมูลสำหรับแนบเข้า token ตอน login สำเร็จ
const bcrypt = require("bcrypt"); // สำหรับเข้ารหัส password
const initPostgreSQL = require("../config/db");
const crypto = require("crypto");

const conn = initPostgreSQL();

// ✅ Social Login
const socialLogin = async (req, res) => {
  try {
    const client = req.redis;
    const sessionId = crypto.randomBytes(16).toString("hex"); // สร้าง Session ID ขนาด 16 ไบต์ (128 บิต)

    const { name, email, provider } = req.body; // ดึงค่าจาก Object {email, password}
    let userData;

    // ตรวจสอบข้อมูลที่จำเป็น;
    if (!name || !provider || !email) {
      return res.status(400).json({ message: "Invalid input data" }); // redir ?
    }

    // หาว่ามี email ที่ทำการ cache ไหม
    const cachedData = await client.get("restaurant-user");
    if (cachedData) {
      const users = await JSON.parse(cachedData);
      userData = users.find((user) => user.email === email); // หา email
    }

    // กรณีไม่มี data ที่ cache ไว้
    if (!userData) {
      // 1.ดึงค่าจาก email จาก DB ถ้าหาไม่เจอใน Redis
      let sql = "select * from public.users where email = $1";
      const result = await conn.query(sql, [email]); // ค้นหา email ที่ตรงกันจาก database

      // * ถ้าไม่มีข้อมูล email => []
      if (result.rows.length === 0) {
        // สร้างข้อมูล User
        let userSql = `INSERT INTO public.users
            (sessionid, firstname, lastname ,email, provider)
            VALUES($1, $2, $3, $4, $5) RETURNING *;`; // RETURNING ให้มีค่าส่งกลับมา

        const [firstname = null, lastname = null] = name.split(" "); // แยก firstname and lastname

        const value = [sessionId, firstname, lastname, email, provider];

        const userRes = await conn.query(userSql, value);

        userData = userRes.rows[0];

        // สร้างข้อมูลที่อยู่ User
        let addressSql = `INSERT INTO public.address
            (sessionid, country, address, city, state, zip_code, is_primary)
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`; // RETURNING ให้มีค่าส่งกลับมา

        const value_2 = [sessionId, null, null, null, null, null, true];

        const addressRes = await conn.query(addressSql, value_2);

        // ดึงค่าทั้งหมดจาก Database มา cache บน Redis
        let userRedisSql = "select * from public.users";
        let addressRedisSql = "select * from public.address";

        const allUsers = await conn.query(userRedisSql);
        const alladdress = await conn.query(addressRedisSql);

        await client.setEx(
          "restaurant-user",
          3600,
          JSON.stringify(allUsers.rows)
        );
        await client.setEx(
          "restaurant-address",
          3600,
          JSON.stringify(alladdress.rows)
        );
      } else {
        // * ถ้ามีข้อมูล email
        userData = result.rows[0];
      }
    }

    // Create jwt token
    const token = jwt.sign(
      { email: userData.email, role: userData.role || "user" },
      process.env.SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );

    const response =
      userData.role == "admin"
        ? {
            message: "Login successful",
            accessToken: token,
            id: userData.sessionid,
            role: "admin",
          }
        : {
            message: "Login successful",
            id: userData.sessionid,
            accessToken: token,
          };

    res.json(response);
  } catch (error) {
    console.log("error", error);
    // ตรวจสอบว่ามี email ซ้ำกัน
    if (error.code === "23505") {
      res.status(409).json({ message: "Duplicate email address" });
    }
    res.status(500).json({ message: "Insert error", error });
  }
};

module.exports = { socialLogin };
