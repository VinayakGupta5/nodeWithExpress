const express = require('express')
const customerController = require('../../controllers/customer/CustomerController')

const router = express.Router()

router.get('/profileById/:_id', customerController.profileById)

module.exports = router;