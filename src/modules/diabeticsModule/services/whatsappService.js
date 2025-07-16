// src/services/whatsappService.js
const axios = require('axios');

async function sendMessage(contactNumber, message = null, templateName = null, templateParams = [], languageCode = 'en_US') {
  const headers = {
    Authorization: `Bearer ${process.env.WHATSAPP_VERIFY_TOKEN}`,
    'Content-Type': 'application/json'
  };

  const to = contactNumber.startsWith('91') ? contactNumber : `91${contactNumber}`;
  let data;

  if (templateName) {
    data = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: languageCode },
        components: templateParams.length > 0 ? [
          {
            type: 'body',
            parameters: templateParams.map(param => ({
              type: 'text',
              text: param
            }))
          }
        ] : []
      }
    };
  } else if (message) {
    data = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: message }
    };
  } else {
    throw new Error('Provide either a message or a templateName.');
  }

  const response = await axios.post('https://graph.facebook.com/v22.0/672408552624038/messages', data, { headers });
  return response.data;
}

module.exports = { sendMessage };
