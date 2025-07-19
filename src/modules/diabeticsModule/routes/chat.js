const express = require('express');
const {
  listChats,
  getConversation,
  replyToUser,
  deleteChatByMessageId,
  deleteChatsByNumber
} = require('../controllers/chat.js');
const { getDashboardStats } = require('../controllers/statsController.js');
const router = express.Router();

// List recent chats
router.get('/', listChats);
router.get('/stats', getDashboardStats);

// Get full conversation for a given phone number
router.get('/:contactNumber', getConversation);

// Reply (or send) message to a user
router.post('/reply/:contactNumber', replyToUser);
// Delete a chat by message ID
router.post('/delete/:messageId', deleteChatByMessageId);
// Delete all chats by phone number
router.post('/deleteAll/:contactNumber', deleteChatsByNumber);

module.exports = router;
