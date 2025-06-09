const jwt = require("jsonwebtoken"); //สำหรับการเข้ารหัสข้อมูลสำหรับแนบเข้า token ตอน login สำเร็จ
const bcrypt = require("bcrypt"); // สำหรับเข้ารหัส password
const initPostgreSQL = require("../config/db");
const crypto = require("crypto");

const conn = initPostgreSQL();

// ✅ Signup
const createUsers = async (req, res) => {
  try {
    const client = req.redis;
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      role,
      country,
      address,
      city,
      state,
      zip_code,
    } = req.body; // ดึงค่าจาก Object {email, password}

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!firstname || !lastname || !email || !phone || !password) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    // hashPassword --> ป้องpassword เมื่อโดน hack
    const passwordHash = await bcrypt.hash(password, 10); // (password, salt (ใส่ number or string ก็ได้) --> เป็น random number ให้รหัสมีความ uniq )
    const sessionId = crypto.randomBytes(16).toString("hex"); // สร้าง Session ID ขนาด 16 ไบต์ (128 บิต)

    const userData = {
      sessionId,
      firstname,
      lastname,
      email, // email: email --> key ชื่อเหมือน value ใส่ตัวเดียว
      phone,
      password: passwordHash, // password: password --> key ชื่อเหมือน value ใส่ตัวเดียว
    };

    //ต้องตรวจสอบว่ามี email ซ้ำกันไหมที่ database โดยมี 2 วิธี (**Mysql**)
    //1. กำหนดที่ database ให้ row นั้นเป็น uniq แล้วจะ hadle ว่า error (แนะนำใช้วิธีนี้ --> ง่ายไม่ต้อง code)
    //2. email ทั้งหมดใน database มาเทียบว่าซ้ำกันไหม
    let sql = `INSERT INTO public.users
            (sessionid, firstname, lastname, email, phone, password ${
              role ? ", role" : ""
            })
            VALUES($1, $2, $3, $4, $5, $6${role ? ", $7" : ""});`;

    const value = role
      ? [sessionId, firstname, lastname, email, phone, passwordHash, role]
      : [sessionId, firstname, lastname, email, phone, passwordHash];

    const response = await conn.query(sql, value);

    let sql2 = `INSERT INTO public.address
            (sessionid, country, address, city, state, zip_code, is_primary)
            VALUES($1, $2, $3, $4, $5, $6, $7);`;

    const value2 = [
      sessionId,
      country || null,
      address || null,
      city || null,
      state || null,
      zip_code || null,
      true,
    ];

    const response2 = await conn.query(sql2, value2);

    // ** Delete Cache data on Redis **
    await client.del("restaurant-user");
    await client.del("restaurant-address");

    res.json({ status: "success", data: response[0] });
  } catch (error) {
    console.log("error", error);
    // ตรวจสอบว่ามี email ซ้ำกัน
    if (error.code === "23505") {
      res.status(409).json({ message: "Duplicate email address" });
    }
    res.status(500).json({ message: "Insert error", error });
  }
};

// ✅ Login
const loginUsers = async (req, res) => {
  try {
    const client = req.redis;
    const { email, password } = req.body;

    let userData;

    const cachedData = await client.get("restaurant-user");
    if (cachedData) {
      const users = await JSON.parse(cachedData);
      userData = users.find((user) => user.email === email);
    }

    // กรณีไม่มี data ที่ cache ไว้
    if (!userData) {
      // 1.ดึงค่าจาก email จาก DB ถ้าหาไม่เจอใน Redis
      let sql = "select * from public.users where email = $1";
      const result = await conn.query(sql, [email]); // ค้นหา email ที่ตรงกันจาก database

      // ถ้าไม่มี email => []
      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Invalid email Please try again" });
      }
      userData = result.rows[0];

      // 2.ดึงค่าจาก Database มา cache บน Redis
      let sql2 = "select * from public.users";
      const allUsers = await conn.query(sql2);
      await client.setEx(
        "restaurant-user",
        3600,
        JSON.stringify(allUsers.rows)
      );
    }

    // compare password
    const match = await bcrypt.compare(password, userData.password); // เทียบ password return true or false ** await ด้วย
    if (!match) {
      return res
        .status(400)
        .json({ message: "Invalid password Please try again" });
    }

    // create jwt token
    const token = jwt.sign(
      { email: userData.email, role: userData.role || "user" },
      process.env.SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );

    const response =
      userData.role == "admin"
        ? { message: "Login successful", token, role: "admin" }
        : { message: "Login successful", token };

    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(401).json({ message: "Login failed", error });
  }
};

// 🔍 ดึงข้อมูลผู้ใช้งานจาก Email (ใช้หน้า user account)
const getUsersEmail = async (req, res) => {
  try {
    const client = req.redis;
    const userData = await client.get("restaurant-user");
    const addressData = await client.get("restaurant-address");

    const user = req.user; // ได้จาก protect middleware
    let checkEmail;

    // ตรวจสอบว่ามี data ที่ cache ไว้ที่ Redis ไหม
    if (userData && addressData) {
      const userRes = await JSON.parse(userData);
      const addressRes = await JSON.parse(addressData);

      const userfinal = userRes.filter((val) => val.email == user.email);
      const addressfinal = addressRes.filter(
        (val) => userfinal[0].sessionid == val.sessionid
      );

      checkEmail = { ...userfinal[0], ...addressfinal[0] };
      console.log("From Redis : ", checkEmail);
    } else {
      // กรณีไม่มีให้ดึงค่าจาก database
      const usersDb = await conn.query("SELECT * FROM public.users");
      const addressDb = await conn.query("SELECT * FROM public.address");

      await client.setEx("restaurant-user", 3600, JSON.stringify(usersDb.rows));
      await client.setEx(
        "restaurant-address",
        3600,
        JSON.stringify(addressDb.rows)
      );

      const userfinal = usersDb.rows.find((u) => u.email == user.email);
      const addressList = addressDb.rows.filter(
        (a) => a.sessionid == userfinal.sessionid
      );

      if (!userfinal)
        return res.status(404).json({ message: "User not found" });

      console.log("From Database =>", {
        userID: userfinal,
        addressID: addressList[0],
      });

      checkEmail = { ...userfinal, ...addressList[0] };
    }

    res.json({ status: "success", data: checkEmail });
  } catch (error) {
    console.log("error", error);
    res.status(403).json({ message: "authentication fail", error });
  }
};

// 🔍 ดึงข้อมูลผู้ใช้งานทั้งหมด (admin เท่านั้น)
const getAllUsers = async (req, res) => {
  try {
    const client = req.redis;
    const userData = await client.get("restaurant-user"); // *getUser data from redis
    const addressData = await client.get("restaurant-address"); // *getUser data from redis

    if (userData && addressData) {
      const userRes = await JSON.parse(userData);
      const addressRes = await JSON.parse(addressData);

      console.log("From Redis =>", {
        user: userRes.length,
        address: addressRes.length,
      });
      res.json({ message: "Get data on Redis", userdata: userRes });
    } else {
      let userSql = "select * from public.users";
      let addressSql = "select * from public.address";

      const getuser = await conn.query(userSql);
      const getaddress = await conn.query(addressSql);

      console.log("From Database =>", {
        user: getuser.rows.length,
        address: getaddress.rows.length,
      });

      // ✅ cache both users and addresses
      await client.setEx("restaurant-user", 3600, JSON.stringify(getuser.rows));
      await client.setEx(
        "restaurant-address",
        3600,
        JSON.stringify(getaddress.rows)
      );

      res.json({ message: "Get data on Database", userdata: getuser.rows });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};

// 🔍 ดึงข้อมูลผู้ใช้งานด้วย Id (admin เท่านั้น)
const getUsersID = async (req, res) => {
  try {
    const client = req.redis;
    const { id } = await req.params;
    const userData = await client.get("restaurant-user");
    const addressData = await client.get("restaurant-address"); // ✅ correct key

    if (userData && addressData) {
      const userRes = await JSON.parse(userData);
      const addressRes = await JSON.parse(addressData);

      const userID = userRes.filter((val) => val.sessionid == id);
      const addressID = addressRes.filter((val) => val.sessionid == id);

      if (userID && userID.length > 0 && addressID && addressID.length > 0) {
        const userData = [{ ...userID[0], ...addressID[0] }];

        console.log("From Redis =>", { userID: userID, addressID: addressID });
        return res.json({
          message: "Get userID on Redis",
          userdata: userData,
          // addressdata: addressID,
        });
      }
    }

    // ✅ cache both users and addresses
    const usersRes = await conn.query("SELECT * FROM public.users");
    const addressRes = await conn.query("SELECT * FROM public.address");

    await client.setEx("restaurant-user", 3600, JSON.stringify(usersRes.rows));
    await client.setEx(
      "restaurant-address",
      3600,
      JSON.stringify(addressRes.rows)
    );

    const user = usersRes.rows.find((u) => u.sessionid == id);
    const addressList = addressRes.rows.filter((a) => a.sessionid == id);

    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("From Database =>", { userID: user, addressID: addressList });

    const userDB = [{ ...user[0], ...addressList[0] }];

    res.json({
      message: "Get from DB and recache",
      userdata: userDB,
      // addressdata: addressList,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};

// 🔄 แก้ไขผู้ใช้งาน (* admin เท่านั้น)
const updateUserID = async (req, res) => {
  try {
    const client = req.redis;
    const { id } = req.params;
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      role,
      country,
      address,
      city,
      state,
      zip_code,
    } = req.body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!id || !firstname || !lastname || !email || !role || !phone) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // เริ่มสร้างอาร์เรย์สำหรับอัปเดตค่าในฐานข้อมูล
    let updateFields = [
      "firstname = $1",
      "lastname = $2",
      "email = $3",
      "role = $4",
      "phone = $5",
    ];
    let updateValues = [firstname, lastname, email, role, phone];
    let paramIndex = 6; // ใช้สำหรับระบุ index ของค่าใน SQL query

    // หากมีการส่ง password ใหม่มาให้อัปเดต
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // เข้ารหัสรหัสผ่าน
      updateFields.push(`password = $${paramIndex}`);
      updateValues.push(hashedPassword);
      paramIndex++;
    }

    // SQL Statement สำหรับการอัปเดตข้อมูล
    const sql = `
      UPDATE public.users
      SET ${updateFields.join(", ")}
      WHERE sessionid = $${paramIndex}
    `;

    updateValues.push(id); // เพิ่ม id สำหรับ WHERE clause

    // ดำเนินการอัปเดตข้อมูลในฐานข้อมูล
    const userRes = await conn.query(sql, updateValues);

    if (userRes.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // เริ่มสร้างอาร์เรย์สำหรับอัปเดตค่าในฐานข้อมูล
    let addressFields = [
      "country = $1",
      "address = $2",
      "city = $3",
      "state = $4",
      "zip_code = $5",
      "is_primary = $6",
    ];
    let addressValue = [country, address, city, state, zip_code, true];
    let addressParamIndex = 7; // ใช้สำหรับระบุ index ของค่าใน SQL query

    // SQL Statement สำหรับการอัปเดตข้อมูล
    const addressSql = `
      UPDATE public.address
      SET ${addressFields.join(", ")}
      WHERE sessionid = $${addressParamIndex}
    `;

    addressValue.push(id); // เพิ่ม id สำหรับ WHERE clause

    // ดำเนินการอัปเดตข้อมูลในฐานข้อมูล
    const addressRes = await conn.query(addressSql, addressValue);

    // อัปเดตข้อมูล cache บน Redis
    const sql2 = "SELECT * FROM public.users";
    const sql3 = "SELECT * FROM public.address";

    const getUser = await conn.query(sql2);
    const getAddress = await conn.query(sql3);

    await client.setEx("restaurant-user", 3600, JSON.stringify(getUser.rows));
    await client.setEx(
      "restaurant-address",
      3600,
      JSON.stringify(getAddress.rows)
    );

    res.json({
      message: "Update success",
      updatedUser: userRes.rows,
      updatedAddress: addressRes.rows,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Update failed", error });
  }
};

// ❌ ลบผู้ใช้งาน (* admin เท่านั้น)
const removeUserID = async (req, res) => {
  try {
    const client = req.redis;
    const { id } = await req.params;
    let userSql = "DELETE FROM public.users WHERE sessionid = $1";
    let addressSql = "DELETE FROM public.address WHERE sessionid = $1";

    const userRes = await conn.query(userSql, [id]);
    const addressRes = await conn.query(addressSql, [id]);

    console.log("From Database :", {
      userID: userRes.rows[0],
      addressID: addressRes,
    });

    //2.ดึงค่าจาก Database มา cache บน Redis
    let sql = "select * from public.users";
    let sql2 = "select * from public.address";

    const getuser = await conn.query(sql);
    const getaddress = await conn.query(sql2);

    await client.setEx("restaurant-user", 3600, JSON.stringify(getuser.rows));
    await client.setEx(
      "restaurant-address",
      3600,
      JSON.stringify(getaddress.rows)
    );

    res.json({ message: "remove success" });
  } catch (error) {
    console.log("error", error);
    res.status(403).json({ message: "remove fail", error });
  }
};

module.exports = {
  getAllUsers,
  getUsersEmail,
  createUsers,
  loginUsers,
  getUsersID,
  removeUserID,
  updateUserID,
};
