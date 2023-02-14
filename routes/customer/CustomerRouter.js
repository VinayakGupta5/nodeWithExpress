const express = require('express')
const customerController = require('../../controllers/customer/CustomerController')


const router = express.Router()

router.get('/ProfileById/:_id', customerController.profileById)

module.exports = router;