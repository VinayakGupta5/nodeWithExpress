const express = require('express');
const categoryAdminController = require('../../controllers/admin/CategoryAdminController')

const router = express.Router()

router.post('/CreateMainCategory', categoryAdminController.CreateMainCategory)
router.post('/CreateSubCategory', categoryAdminController.CreateSubCategory)
router.get('/getCategory', categoryAdminController.getCategory)
router.delete('/deleteCategory', categoryAdminController.deleteCategory)
router.put('/updateCategory', categoryAdminController.updateCategory)
router.get('/getCategoryById/:_id', categoryAdminController.getCategoryById)

module.exports = router;