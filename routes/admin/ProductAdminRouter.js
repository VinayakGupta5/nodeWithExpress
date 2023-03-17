const express = require('express')
const adminController = require('../../controllers/admin/ProductAdminController')


const router = express.Router()

router.post('/addProduct', adminController.postProduct)
router.post('/addManyProduct', adminController.postMultipleProducts)
router.get('/getProduct/:_id', adminController.getOneProductById)
router.get('/getProducts', adminController.getAllProducts)
router.post('/updateProduct', adminController.updateProduct)
router.delete('/deleteProduct/:_id', adminController.deleteProduct)
router.get('/getProductsPerPage', adminController.getProductsPerPage)
router.post('/checkProductsExist', adminController.checkProductsExist)
router.get('/searchProdByName', adminController.getProductsByNameSearch)
router.post('/filterProd', adminController.filterProducts)
router.put('/product/promotion', adminController.appliedPromotionOnProduct)

module.exports = router
