const express = require('express')
const adminController = require('../../controllers/admin/Product')


const router = express.Router()

router.post('/addProduct',adminController.postProduct)
router.get('/getProducts',adminController.getAllProducts)

module.exports = router
