require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, subject, textMessage, htmlContent = null) => {
  if (!email) throw new Error("Recipient email is missing");

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM,
    subject,
    text: textMessage,
    html: htmlContent || undefined,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully to", email);
  } catch (err) {
    console.error("SendGrid Error:", err);
    throw err;
  }
};

module.exports = sendEmail;
