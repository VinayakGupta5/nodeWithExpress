const express = require('express')
const adminController = require('../../controllers/admin/Product')


const router = express.Router()

router.post('/addProduct',adminController.postProduct)
router.post('/addManyProduct',adminController.postMultipleProducts)
router.get('/getProduct/:_id', adminController.getOneProductById)
router.get('/getProducts',adminController.getAllProducts)
router.post('/updateProduct', adminController.updateProduct)
router.delete('/deleteProduct/:_id',adminController.deleteProduct)

module.exports = router
