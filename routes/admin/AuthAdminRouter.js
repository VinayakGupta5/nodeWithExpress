const express = require('express')
const authController = require('../../controllers/admin/AuthController')

const router = express.Router()

router.post('/signup', authController.Signup)
router.post('/login', authController.Login)
router.post('/websiteVerify', authController.websiteVerify)



module.exports = router