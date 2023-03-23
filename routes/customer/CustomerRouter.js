const express = require('express')
const customerController = require('../../controllers/customer/CustomerController')


const router = express.Router()

router.post('/customer', customerController.ProfileUpdate)
// router.post('/profileUpdateById/:_id', customerController.ProfileUpdate)
router.get('/profileById/:_id', customerController.profileById)

module.exports = router;