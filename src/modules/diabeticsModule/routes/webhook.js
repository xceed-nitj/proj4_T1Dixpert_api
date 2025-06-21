const express = require('express');
const router = express.Router();
const {
  verifyWebhook,
  handleWebhookMessage
} = require('../controllers/webhook');

// Facebook/WhatsApp webhook verification
router.get('/', verifyWebhook);

// Incoming messages or delivery updates
router.post('/', handleWebhookMessage);

module.exports = router;
