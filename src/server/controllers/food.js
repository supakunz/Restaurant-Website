const initPostgreSQL = require("../config/db");
const { cloudinary } = require("../config/cloudinary");

const conn = initPostgreSQL();

// ✅ Add Food (* admin เท่านั้น)
const createFood = async (req, res) => {
  try {
    const client = req.redis;
    const { name, category, image, price, rate } = req.body;
    let imageUrl = "/menu/noimage.jpg";
    let image_id = null;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!name || !category || !image || !price || !rate) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // ถ้ามีการส่ง base64 image มา
    if (image && image !== "/menu/noimage.jpg") {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "profile_pic2",
        folder: "restaurant/foods", // 🗂️ ระบุ path ของ folder
      });

      imageUrl = uploadRes.secure_url;
      image_id = uploadRes.public_id;
    }

    //ต้องตรวจสอบว่ามี food ซ้ำกันไหมที่ database โดยมี 2 วิธี (**Mysql**)
    //1. กำหนดที่ database ให้ row นั้นเป็น uniq แล้วจะ hadle ว่า error (แนะนำใช้วิธีนี้ --> ง่ายไม่ต้อง code)
    //2. food ทั้งหมดใน database มาเทียบว่าซ้ำกันไหม

    let sql = `INSERT INTO public.foods
            (name, category, image, image_id, price ,rate)
            VALUES($1, $2, $3, $4, $5, $6);`;

    const value = [name, category, imageUrl, image_id, price, rate];

    const response = await conn.query(sql, value);

    // ** Delete Cache data on Redis **
    await client.del("restaurant-food");

    res.json({ status: "success", data: response[0] });
  } catch (error) {
    console.log("error", error);
    // ตรวจสอบว่ามี food name ซ้ำกัน
    if (error.code === "23505") {
      res.status(409).json({ message: "Duplicate food" });
    } else {
      res.status(500).json({ message: "Insert error", error });
    }
  }
};

// 🔍 ดึงข้อมูลรายการอาหารทั้งหมด (* public/admin)
const getAllFoods = async (req, res) => {
  try {
    const client = req.redis;
    const data = await client.get("restaurant-food"); // *getFood data from redis
    if (data) {
      const response = await JSON.parse(data);
      console.log("From Redis : ", response);
      res.json({ message: "Get data on Redis", fooddata: response });
    } else {
      let sql = "select * from public.foods";
      const getfoods = await conn.query(sql);
      console.log("From Database : ", getfoods);

      // * Cache data on redis
      await client.setEx(
        "restaurant-food",
        3600,
        JSON.stringify(getfoods.rows)
      );

      res.json({ message: "Get data on Database", fooddata: getfoods.rows });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};

// 🔍 ดึงข้อมูลผู้รายการอาหารด้วย Id (* admin เท่านั้น)
const getFoodID = async (req, res) => {
  try {
    const client = req.redis;
    const { id } = await req.params;
    const data = await client.get("restaurant-food");
    if (data) {
      const response = await JSON.parse(data);
      const foodID = response.filter((val) => val.id == id);
      if (foodID && foodID.length > 0) {
        console.log("From Redis : ", foodID);
        return res.json({ message: "Get foodID on Redis", fooddata: foodID });
      }
    }
    let sql = "select * from public.foods where id = $1";
    const response = await conn.query(sql, [id]);
    const food = response.rows[0];
    console.log("From Database : ", food);

    // * ไม่มี foodId ในระบบ
    if (!food) return res.status(404).json({ message: "Food ID not found" });

    await client.setEx("restaurant-food", 3600, JSON.stringify(response.rows));
    res.json({ message: "Get data on Database", fooddata: food });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};

// 🔄 แก้ไขรายการอาหาร (* admin เท่านั้น)
const updateFoodID = async (req, res) => {
  try {
    const client = req.redis;
    const { id } = req.params;
    const { name, category, image, price, rate } = req.body;
    let imageUrl = "/menu/noimage.jpg";
    let image_id = null;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!id || !name || !category || !image || !price || !rate) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // ดึงข้อมูลก่อนลบ เพื่อให้ได้ image_id
    const findSql = "SELECT * FROM public.foods WHERE id = $1";
    const findResult = await conn.query(findSql, [id]);

    // ตรวจสอบว่ามี data ไหม
    if (findResult.rowCount === 0) {
      return res.status(404).json({ message: "Food not found" });
    }

    const old_image = findResult.rows[0];

    // ในกรณีที่รูปภาพไม่ใช้ noimage (มีรูปส่งมา)
    if (image !== "/menu/noimage.jpg" && old_image.image !== image) {
      if (old_image.image_id) {
        await cloudinary.uploader.destroy(old_image.image_id);
      }
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "profile_pic2",
        folder: "restaurant/foods", // 🗂️ ระบุ path ของ folder
      });
      imageUrl = uploadRes.url;
      image_id = uploadRes.public_id;
    } else {
      // ในกรณีที่ไม่มีรูปภาพส่งมา
      imageUrl = old_image.image;
      image_id = old_image.image_id;
    }

    // เริ่มสร้างอาร์เรย์สำหรับอัปเดตค่าในฐานข้อมูล
    let updateFields = [
      "name = $1",
      "category = $2",
      "image = $3",
      "image_id = $4",
      "price = $5",
      "rate = $6",
    ];
    let updateValues = [name, category, imageUrl, image_id, price, rate];
    let paramIndex = 7; // ใช้สำหรับระบุ index ของค่าใน SQL query

    // SQL Statement สำหรับการอัปเดตข้อมูล
    const sql = `
      UPDATE public.foods
      SET ${updateFields.join(", ")}
      WHERE id = $${paramIndex}
    `;

    updateValues.push(id); // เพิ่ม id สำหรับ WHERE clause

    // ดำเนินการอัปเดตข้อมูลในฐานข้อมูล
    const response = await conn.query(sql, updateValues);

    // อัปเดตข้อมูล cache บน Redis
    const sql2 = "SELECT * FROM public.foods";
    const getFood = await conn.query(sql2);
    await client.setEx("restaurant-food", 3600, JSON.stringify(getFood.rows));

    res.json({ message: "Update success", updatedUser: response.rows });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ message: "Update failed", error });
  }
};

// ❌ ลบรายการอาหาร (* admin เท่านั้น)
const removeFoodID = async (req, res) => {
  try {
    const client = req.redis;
    const { id } = req.params;

    // ป้องกันการลบข้อมูลหลัก
    if (id < 43) {
      return res
        .status(403)
        .json({ message: "Cannot delete system-defined food item" });
    }

    // 1. ดึงข้อมูลก่อนลบ เพื่อให้ได้ image_id
    const findSql = "SELECT * FROM public.foods WHERE id = $1";
    const findResult = await conn.query(findSql, [id]);

    if (findResult.rowCount === 0) {
      return res.status(404).json({ message: "Food not found" });
    }

    const image_id = findResult.rows[0].image_id;

    // 2. ลบจาก Cloudinary ถ้ามี image_id
    if (image_id) {
      await cloudinary.uploader.destroy(image_id);
    }
    console.log("From Database :", findResult.rows[0]);

    // 3. ลบจาก database
    let sql = "DELETE FROM public.foods WHERE id = $1";
    await conn.query(sql, [id]);

    //2.ดึงค่าจาก Database มา cache บน Redis
    let sql2 = "select * from public.foods";
    const getfood = await conn.query(sql2);
    await client.setEx("restaurant-food", 3600, JSON.stringify(getfood.rows));

    res.json({ message: "remove success" });
  } catch (error) {
    console.log("error", error);
    res.status(403).json({ message: "remove fail", error });
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getFoodID,
  updateFoodID,
  removeFoodID,
};
