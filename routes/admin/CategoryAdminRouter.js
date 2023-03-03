const express = require('express');
const categoryAdminController = require('../../controllers/admin/CategoryAdminController')

const router = express.Router()

router.post('/CreateMainCategory', categoryAdminController.CreateMainCategory)
router.post('/CreateSubCategory', categoryAdminController.CreateSubCategory)
router.get('/getCategory', categoryAdminController.getCategory)
router.post('/deleteCategory', categoryAdminController.deleteCategory)
router.post('/updateCategory', categoryAdminController.updateCategory)
router.get('/getCategoryById/:_id', categoryAdminController.getCategoryById)

module.exports = router;