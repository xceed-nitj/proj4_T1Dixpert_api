const express = require('express');
const router = express.Router();
const {
  verifyWebhook,
  receiveWebhook
} = require('../controllers/webhook');

// Facebook/WhatsApp webhook verification
router.get('/', verifyWebhook);

// Incoming messages or delivery updates
router.post('/', receiveWebhook);

module.exports = router;
