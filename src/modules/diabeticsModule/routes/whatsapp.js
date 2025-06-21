const express = require('express')
const {
  sendTemplateMessage,
    sendTextMessage
} = require('../controllers/whatsapp') // Import the controller
const router = express.Router()
const { checkRole } = require('../../checkRole.middleware')


router.post("/sendTemplate",sendTemplateMessage);
router.post("/sendText",sendTextMessage);




module.exports = router
