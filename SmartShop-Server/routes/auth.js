const express = require('express')
const router = express.Router() 
const { body } = require('express-validator') 
const authController = require('../controllers/authController') 

// กำหนด middleware สำหรับตรวจสอบข้อมูลที่ส่งมาใน body ของ request
// ใช้ express-validator เพื่อเช็กว่าช่อง username และ password ต้องไม่ว่าง
const registerValidator = [
    body('username', 'username cannot be empty!').not().isEmpty(),
    body('password', 'password cannot be empty.').not().isEmpty()
]

const loginValidator = [
    body('username', 'username cannot be empty.').not().isEmpty(), 
    body('password', 'password cannot be empty.').not().isEmpty()  
]

router.post('/register', registerValidator, authController.register)
router.post('/login', loginValidator, authController.login)

module.exports = router 