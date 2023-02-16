const express = require('express')
const promotionController = require('../../controllers/admin/PromotionController')

const router = express.Router()


router.post('/createPromotion', promotionController.CreatePromotion)
router.get('/GetAllPromotion', promotionController.GetAllPromotions)
router.get('/GetPromotionById/:_id', promotionController.GetPromotionById)



module.exports = router