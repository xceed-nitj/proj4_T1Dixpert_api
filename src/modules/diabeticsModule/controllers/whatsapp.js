const axios = require('axios');

exports.sendTemplateMessage = async (req, res) => {
  try {
    console.log(req.body);
    const response = await axios.post('https://graph.facebook.com/v22.0/672408552624038/messages', {
      messaging_product: 'whatsapp',
      
      to: req.body.contactNumber,
      type: 'template',
      template: {
        name: 'hello_world',
        language: { code: 'en_US' }
      }
    }, {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_VERIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.sendTextMessage = async (req, res) => {
  try {
    console.log(req.body);
    const response = await axios.post('https://graph.facebook.com/v22.0/672408552624038/messages', {
      messaging_product: 'whatsapp',
      to: req.body.contactNumber,
      type: 'text',
      text: { body: req.body.message }
    }, {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_VERIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};
