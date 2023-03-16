const express = require('express')
const promotionController = require('../../controllers/admin/PromotionAdminController')

const router = express.Router()


router.post('/createPromotion', promotionController.CreatePromotion)
router.get('/GetAllPromotion', promotionController.GetAllPromotions)
router.get('/GetPromotionById/:_id', promotionController.GetPromotionById)
router.post('/updatePromotion', promotionController.updatePromotion)
router.delete('/DeletePromotionById/:_id', promotionController.deletePromotion)



module.exports = router   