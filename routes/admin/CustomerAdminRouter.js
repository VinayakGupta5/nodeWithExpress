const express = require('express')
const customerController = require('../../controllers/admin/CustomerAdminController')


const router = express.Router()

router.post('/createCustomer', customerController.CreateCustomer)
router.get('/getcustomers', customerController.GetCustomers)
router.get('/getcustomerById/:_id', customerController.GetCustomerById)


module.exports = router