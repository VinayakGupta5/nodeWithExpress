const express  = require('express');
const SettingController =  require('../../controllers/admin/SettingAdminController')

const router = express.Router();


router.post('/Setting', SettingController.CreateSetting )

module.exports =  router