exports.verifyWebhook = (req, res) => {
  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;
   console.log('Webhook verification request received');
  console.log('Query parameters:', req.query);
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified');
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
};



exports.handleWebhookMessage = (req, res) => {
  const body = JSON.stringify(req.body,null,2);
  console.log('Received webhook body:', body);

  if (body.object) {
    

    
    return res.status(200).send('EVENT_RECEIVED');
  }

  return res.sendStatus(404);
};