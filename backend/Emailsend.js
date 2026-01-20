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
    .setFrom(process.env.MAILERSEND_FROM) // verified sender
    .setTo(email)
    .setSubject(subject)
    .setText(textMessage);

  if (htmlContent) {
    emailParams.setHtml(htmlContent);
  }

  try {
    // ✅ Correct method for v2
    const response = await mailer.emails.send(emailParams);
    console.log("Email sent successfully!", response);
    return response;
  } catch (err) {
    if (err.response && err.response.body) {
      console.error("MailerSend API Error:", err.response.body);
    } else {
      console.error("MailerSend Error:", err);
    }
    throw err;
  }
};

module.exports = sendEmail;
