require("dotenv").config();
const { MailerSend, EmailParams } = require("mailersend");

const mailer = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sendEmail = async (to, subject, textMessage, htmlContent = null) => {
  try {
    // MailerSend requires 'to' as an array of objects
    const emailParams = new EmailParams()
      .setFrom({ email: process.env.MAILERSEND_FROM, name: "MINIMAL" })

      .setTo([{ email: to }])
      .setSubject(subject)
      .setText(textMessage);

    if (htmlContent) {
      emailParams.setHtml(htmlContent);
    }

    await mailer.email.send(emailParams);

    console.log("Email sent successfully to", to);
  } catch (err) {
    console.error("MailerSend Error:", err);
    throw err;
  }
};

module.exports = sendEmail;
