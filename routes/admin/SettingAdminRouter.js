const express  = require('express');
const SettingController =  require('../../controllers/admin/SettingAdminController')

const router = express.Router();


router.post('/Setting', SettingController.CreateSetting )
router.get('/Setting', SettingController.GetSettings )
router.put('/Setting/:_id', SettingController.UpdateSetting )
router.delete('/Setting/:_id', SettingController.DeleteSettingById )

module.exports =  router