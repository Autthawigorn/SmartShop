const express = require("express");
const models = require("./models");
const { body, validationResult } = require("express-validator");
const app = express();

// JSON middleware (parsing application/json)
app.use(express.json());


// กำหนด middleware สำหรับตรวจสอบข้อมูลที่ส่งมาใน body ของ request
// ใช้ express-validator เพื่อเช็กว่าช่อง username และ password ต้องไม่ว่าง
const registerValidator = [
    body('username', 'username cannot be empty!').not().isEmpty(), 
    body('password', 'password cannot be empty!').not().isEmpty() 
]

// สร้าง route สำหรับลงทะเบียนผู้ใช้ใหม่
app.post('/register', registerValidator, (req, res) => {

    // ✅ ดึงผลลัพธ์การตรวจสอบข้อมูลจาก express-validator
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      // รวมข้อความ error ทั้งหมดเป็นข้อความเดียว เช่น "username cannot be empty and password cannot be empty"
        const msg = errors.array().map(error => error.msg).join(" and ")

        // Return HTTP status 422 (Unprocessable Entity)
        // This means the request was syntactically correct but contains invalid data
        return res.status(422).json({success: false, message: msg})
    }

    const { username, password } = req.body 

    // create a new user 
    const newUser = models.User.create({
        username: username, 
        password: password 
    })

    res.status(201).json({ success: true})

})


// start the server
app.listen(8080, () => {
  console.log("Server is running.");
});
