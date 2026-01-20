require("dotenv").config();
const MailerSend = require("mailersend");

const mailer = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sendEmail = async (to, subject, textMessage, htmlContent = null) => {
  try {
    const response = await mailer.email.send({
      from: process.env.MAILERSEND_FROM,
      to: [to],
      subject,
      text: textMessage,
      html: htmlContent || undefined,
    });

    console.log("Email sent successfully to", to);
    return response;
  } catch (err) {
    console.error("MailerSend Error:", err);
    throw err;
  }
};

module.exports = sendEmail;
