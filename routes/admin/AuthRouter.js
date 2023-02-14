const express = require('express')
const authController = require('../../controllers/admin/AuthController')

const router = express.Router()

router.post('/signup', authController.Signup)
router.post('/login', authController.Login)



module.exports = router