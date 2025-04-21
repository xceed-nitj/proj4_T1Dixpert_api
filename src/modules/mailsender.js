const nodemailer = require("nodemailer");

const mailSender = async (email, title, body, fromData = { name: "XCEED NITJ", address: process.env.MAIL_USER }) => {
  try {
    let transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transport.sendMail({
      from: `${fromData.name} <${fromData.address}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    // console.log(info);
    return info;
  } catch (e) {
    console.log(
      "error is happening in sending mail during transporter creating",
      e
    );
  }
};

module.exports = mailSender;
