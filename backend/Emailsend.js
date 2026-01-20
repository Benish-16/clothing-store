require("dotenv").config();
const { MailerSend, EmailParams } = require("mailersend");

// Initialize MailerSend with API key
const mailer = new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY });

/**
 * Send an email via MailerSend
 * @param {string} email - recipient email
 * @param {string} subject - email subject
 * @param {string} textMessage - plain text message
 * @param {string|null} htmlContent - optional HTML content
 */
const sendEmail = async (email, subject, textMessage, htmlContent = null) => {
  if (!email) {
    throw new Error("Recipient email is missing");
  }

  // Prepare email parameters
  const emailParams = new EmailParams()
    .setFrom(process.env.MAILERSEND_FROM) // must be a verified sender
    .setTo([email])                       // recipient(s) must be array
    .setSubject(subject)
    .setText(textMessage);

  if (htmlContent) {
    emailParams.setHtml(htmlContent);
  }

  try {
    // Correct function to send email
    const response = await mailer.emails.send(emailParams);
    console.log("Email sent successfully!", response);
    return response;
  } catch (err) {
    console.error("MailerSend Error:", err.response?.body || err);
    throw err;
  }
};

module.exports = sendEmail;
