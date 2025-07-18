const mongoose = require('mongoose');

const broadcastSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  recipients: {
    type: [String],
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'template'],
    required: true
  },
  text: {
    type: String
  },
  templateName: {
    type: String
  },
  templateParams: {
    type: mongoose.Mixed
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  sent: {
    type: Boolean,
    default: false
  },
  results: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Broadcast', broadcastSchema);