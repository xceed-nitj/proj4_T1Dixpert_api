const Broadcast = require('../../../models/diabeticsModule/broadcast.js');
const Chat = require('../../../models/diabeticsModule/chat.js');
const { sendMessage } = require('../services/whatsappService');

//  Schedules or immediately sends a broadcast
const scheduleBroadcast = (broadcast) => {
  const delay = broadcast.scheduledAt.getTime() - Date.now();
  if (broadcast.sent) return;
  if (delay <= 0) {
    executeBroadcast(broadcast);
  } else {
    setTimeout(() => executeBroadcast(broadcast), delay);
  }
};

//  Executes the broadcast message send
const executeBroadcast = async (broadcast) => {
  try {
    const fresh = await Broadcast.findById(broadcast._id);
    if (!fresh || fresh.sent) return;

    const results = [];

    for (const to of fresh.recipients) {
      try {
        let waRes;
        if (fresh.type === 'template') {
          waRes = await sendMessage(to, null, fresh.templateName, fresh.templateParams);
        } else {
          waRes = await sendMessage(to, fresh.text);
        }

        const chat = await Chat.create({
          messageId: waRes?.messages?.[0]?.id || 'unknown',
          direction: 'outbound',
          from: process.env.WHATSAPP_PHONE_NUMBER,
          to,
          text: fresh.type === 'text' ? fresh.text : null,
          templateName: fresh.type === 'template' ? fresh.templateName : null,
          templateParams: fresh.type === 'template' ? fresh.templateParams : null,
          timestamp: new Date()
        });

        results.push(chat._id);
      } catch (err) {
        console.error(`❌ Failed to send to ${to}`, err.message);
      }
    }

    await Broadcast.findByIdAndUpdate(fresh._id, {
      sent: true,
      results
    });
  } catch (err) {
    console.error('Broadcast execution failed:', err.message);
  }
};

//  On server start, reschedule unsent broadcasts
const initBroadcastScheduler = async () => {
  try {
    const pending = await Broadcast.find({ sent: false });
    pending.forEach(scheduleBroadcast);
    console.log(`✅ Rescheduled ${pending.length} broadcasts`);
  } catch (err) {
    console.error('Failed to init scheduler:', err.message);
  }
};

//  Create a new broadcast
const createBroadcast = async (req, res, next) => {
  try {
    const {
      name,
      recipients,
      type,
      text,
      templateName,
      templateParams,
      scheduledAt
    } = req.body;

    const scheduledTime = new Date(scheduledAt);//please send utc time in ISO format
    if (isNaN(scheduledTime.getTime())) {
      return res.status(400).json({ message: 'Invalid scheduledAt' });
    }

    const bc = await Broadcast.create({
      name,
      recipients,
      type,
      text: type === 'text' ? text : undefined,
      templateName: type === 'template' ? templateName : undefined,
      templateParams: type === 'template' ? templateParams : undefined,
      scheduledAt: scheduledTime
    });

    scheduleBroadcast(bc);
    res.status(201).json(bc);
  } catch (err) {
    next(err);
  }
};

//  List all broadcasts
const listBroadcasts = async (req, res, next) => {
  try {
    const all = await Broadcast.find().sort({ scheduledAt: -1 });
    res.json(all);
  } catch (err) {
    next(err);
  }
};

//  Get one broadcast by ID
const getBroadcast = async (req, res, next) => {
  try {
    const bc = await Broadcast.findById(req.params.id);
    if (!bc) return res.status(404).json({ message: 'Broadcast not found' });
    res.json(bc);
  } catch (err) {
    next(err);
  }
};

//  Delete a broadcast
const deleteBroadcast = async (req, res, next) => {
  try {
    const bc = await Broadcast.findByIdAndDelete(req.params.id);
    if (!bc) return res.status(404).json({ message: 'Broadcast not found' });
    res.json({ message: 'Broadcast deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBroadcast,
  listBroadcasts,
  getBroadcast,
  deleteBroadcast,
  initBroadcastScheduler   //TODO : Call this IN app.js to reschedule broadcasts
};
