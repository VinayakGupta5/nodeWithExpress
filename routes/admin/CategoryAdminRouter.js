const express = require('express');
const categoryAdminController = require('../../controllers/admin/CategoryAdminController')

const router = express.Router()

router.post('/CreateMainCategory', categoryAdminController.CreateMainCategory)
router.post('/CreateSubCategory', categoryAdminController.CreateSubCategory)
router.get('/getCategory', categoryAdminController.getCategory)

module.exports = router;