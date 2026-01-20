require("dotenv").config();
const { MailerSend, EmailParams } = require("mailersend");

// Initialize MailerSend
const mailer = new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY });

const sendEmail = async (email, subject, textMessage, htmlContent = null) => {
  if (!email) {
    throw new Error("Recipient email is missing");
  }

  // Prepare email parameters
  const emailParams = new EmailParams()
    .setFrom(process.env.MAILERSEND_FROM) // must be a verified sender
    .setTo(email)                         // recipient
    .setSubject(subject)
    .setText(textMessage);                // plain text

  if (htmlContent) {
    emailParams.setHtml(htmlContent);     // optional HTML
  }

  try {
    const response = await mailer.emails.send(emailParams); // v2 correct
    console.log("Email sent successfully!", response);
    return response;
  } catch (err) {
    // Better error logging
    if (err.response && err.response.body) {
      console.error("MailerSend API Error:", err.response.body);
    } else {
      console.error("MailerSend Error:", err);
    }
    throw err;
  }
};

module.exports = sendEmail;
