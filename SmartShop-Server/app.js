const express = require("express");
const models = require("./models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const app = express();

// JSON middleware (parsing application/json)
app.use(express.json());

// กำหนด middleware สำหรับตรวจสอบข้อมูลที่ส่งมาใน body ของ request
// ใช้ express-validator เพื่อเช็กว่าช่อง username และ password ต้องไม่ว่าง
const registerValidator = [
  body("username", "username cannot be empty!").not().isEmpty(),
  body("password", "password cannot be empty!").not().isEmpty(),
];

// สร้าง route สำหรับลงทะเบียนผู้ใช้ใหม่
app.post("/register", registerValidator, async (req, res) => {
  // ✅ ดึงผลลัพธ์การตรวจสอบข้อมูลจาก express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // รวมข้อความ error ทั้งหมดเป็นข้อความเดียว เช่น "username cannot be empty and password cannot be empty"
    const msg = errors
      .array()
      .map((error) => error.msg)
      .join(" and ");

    // Return HTTP status 422 (Unprocessable Entity)
    // This means the request was syntactically correct but contains invalid data
    return res.status(422).json({ success: false, message: msg });
  }

  try {
    const { username, password } = req.body;

    const existingUser = await models.User.findOne({
      where: {
        username: { [Op.iLike]: username },
      },
    });

    if (existingUser) {
      return res.json({ message: "Username taken!", success: false });
    }

    // crypt the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = models.User.create({
      username,
      password: hash,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", success: false });
  }
});

// start the server
app.listen(8080, () => {
  console.log("Server is running.");
});
