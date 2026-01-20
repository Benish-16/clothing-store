require("dotenv").config();
const { MailerSend, EmailParams } = require("mailersend");

// Initialize MailerSend with API key
const mailer = new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY });

const sendEmail = async (email, subject, textMessage, htmlContent = null) => {
  if (!email) {
    throw new Error("Recipient email is missing");
  }

  // Prepare email parameters
  const emailParams = new EmailParams()
    .setFrom(process.env.MAILERSEND_FROM) // verified sender, e.g., no-reply@yourdomain.com
    .setTo(email)                         // recipient
    .setSubject(subject)
    .setText(textMessage);                // plain text

  if (htmlContent) {
    emailParams.setHtml(htmlContent);     // optional HTML
  }

  try {
    const response = await mailer.send(emailParams);
    console.log("Email sent successfully!", response);
    return response;
  } catch (err) {
    console.error("MailerSend Error:", err);
    throw err;
  }
};

module.exports = sendEmail;
