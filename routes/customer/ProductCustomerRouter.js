const express = require('express');
const productCustomerController = require('../../controllers/customer/ProductCustomerController')

const router = express.Router();

router.get('/products', productCustomerController.GetProducts )

module.exports = router;