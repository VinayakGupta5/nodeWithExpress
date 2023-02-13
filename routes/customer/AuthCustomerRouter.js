const express = require('express')
const AuthCustomerController = require('../../controllers/customer/AuthCustomerController')
const isAuth = require('../../middleware/isAuth');

const router = express.Router()

router.get('/websiteVerify', AuthCustomerController.websiteVerify)
router.post('/CustomerSignup', isAuth, AuthCustomerController.Signup)
router.post('/CustomerLogin', isAuth, AuthCustomerController.Login)

module.exports = router