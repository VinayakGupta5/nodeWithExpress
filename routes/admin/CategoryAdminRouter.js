const express = require('express');
const categoryAdminController = require('../../controllers/admin/CategoryAdminController')

const router = express.Router()

router.post('/CreateMainCategory', categoryAdminController.CreateMainCategory)
router.post('/CreateSubCategory', categoryAdminController.CreateSubCategory)
router.get('/getCategory', categoryAdminController.getCategory)
router.post('/deleteCategory/:_id', categoryAdminController.deleteCategory)

module.exports = router;