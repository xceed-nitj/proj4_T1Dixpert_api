const Chat = require('../../../models/diabeticsModule/chat');



const verifyWebhook = (req, res) => {
  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
};

const receiveWebhook = async (req, res, next) => {
  try {
    const body = req.body;
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          for (const m of change.value.messages || []) {
            const isTemplate = m.type === 'template';
            await Chat.create({
              messageId: m.id,
              direction: 'inbound',
              from: m.from,
              to: process.env.WHATSAPP_PHONE_NUMBER,
              text: isTemplate ? null : m.text?.body || null,
              templateName: isTemplate ? m.template?.name : null,
              templateParams: isTemplate ? m.template?.components : null,
              timestamp: new Date(parseInt(m.timestamp, 10) * 1000),
            });
          }
        }
      }
      return res.sendStatus(200);
    }
    res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verifyWebhook,
  receiveWebhook
};