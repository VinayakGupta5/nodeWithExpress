const express = require('express')
const adminController = require('../../controllers/admin/Product')


const router = express.Router()

router.post('/addProduct',adminController.postProduct)
router.post('/addManyProduct',adminController.postMultipleProducts)
router.get('/getProduct/:PKID', adminController.getOneProductById)
router.get('/getProducts',adminController.getAllProducts)
router.post('/updateProduct')
router.delete('/deleteProduct/:PKID',adminController.deleteProduct)

module.exports = router
