// src/controllers/chatController.js
const Chat = require('../../../models/diabeticsModule/chat');
const { sendMessage } = require('../services/whatsappService'); 


const listChats = async (req, res, next) => {
  try {
    const chats = await Chat.find().sort({ timestamp: -1 }).limit(100);
    res.json(chats);
  } catch (err) {
    next(err);
  }
};

const getConversation = async (req, res, next) => {
  try {
    console.log(req.params);
    const { contactNumber } = req.params;
    if (!contactNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
    const conv = await Chat.find({
      $or: [{ from: contactNumber }, { to: contactNumber }]
    }).sort({ timestamp: 1 });
    res.status(200).json(conv);
  } catch (err) {
    next(err);
  }
};



const replyToUser = async (req, res, next) => {
  try {
    const { contactNumber } = req.params;
    const { message, templateName, templateParams = [] } = req.body;

    const waResponse = await sendMessage(contactNumber, message, templateName, templateParams);

    const messageId = waResponse?.messages?.[0]?.id;

    const chat = await Chat.create({
      messageId,
      direction: 'outbound',
      from: process.env.WHATSAPP_PHONE_NUMBER,
      to: contactNumber,
      text: message || null,
      templateName: templateName || null,
      templateParams: templateParams || null
    });
    console.log('Chat created:', chat);

    res.status(201).json(chat);
  } catch (err) {
    next(err);
  }
};

const deleteChatByMessageId = async (req, res, next) => {
  try {
    const { messageId } = req.params;

    const deleted = await Chat.findOneAndDelete({ messageId });

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Chat not found' });
    }

    res.status(200).json({ success: true, message: 'Chat deleted successfully', deleted });
  } catch (err) {
    next(err);
  }
};



const deleteChatsByNumber = async (req, res, next) => {
  try {
    const { contactNumber } = req.params;
    console.log(contactNumber);
    if (!contactNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const result = await Chat.deleteMany({
      $or: [{ from: contactNumber }, { to: contactNumber }]
    });

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} messages for ${contactNumber}`,
    });
  } catch (err) {
    next(err);
  }
};




module.exports = {
  listChats,
  getConversation,
  replyToUser,
  deleteChatByMessageId,
  deleteChatsByNumber
};
