const express = require('express')
const isAuth = require('../../middleware/isAuth')
const adminController = require('../../controllers/admin/Product')


const router = express.Router()

router.post('/addProduct', adminController.postProduct)
router.post('/addManyProduct', adminController.postMultipleProducts)
router.get('/getProduct/:_id', isAuth, adminController.getOneProductById)
router.get('/getProducts', adminController.getAllProducts)
router.post('/updateProduct', adminController.updateProduct)
router.delete('/deleteProduct/:_id', adminController.deleteProduct)
router.get('/getProductsPerPage/', adminController.getProductsPerPage)
router.post('/checkProductsExist/', adminController.checkProductsExist)

module.exports = router
