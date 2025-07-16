// src/models/Chat.js
// src/models/chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  messageId:      { type: String, required: true, unique: true },
  direction:      { type: String, enum: ['inbound', 'outbound'], required: true },
  from:           { type: String, required: true }, // user phone number
  to:             { type: String, required: true }, // your WhatsApp number
  text:           { type: String },
  timestamp:      { type: Date, default: Date.now },
  templateName:   { type: String }, // template used (if any)
  templateParams: { type: mongoose.Schema.Types.Mixed } // values injected into the template
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);

