const express = require('express')
const adminController = require('../../controllers/admin/Product')


const router = express.Router()

router.post('/addProduct',adminController.postProduct)
router.get('/getProducts',adminController.getAllProducts)
router.delete('/deleteProduct/:pkId',adminController.deleteProduct)

module.exports = router
