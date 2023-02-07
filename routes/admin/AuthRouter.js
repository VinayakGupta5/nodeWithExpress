const express  = require('express')
const authController = require('../../controllers/admin/AuthController')

const router = express.Router()

router.post('/login', authController.Login )
router.post('/signup', authController.Signup )


module.exports = router