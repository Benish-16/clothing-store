require("dotenv").config();
const axios = require("axios");

/**
 * Send email using MailerSend API
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} text - plain text message
 * @param {string|null} htmlContent - optional HTML content
 */
const sendEmail = async (to, subject, text, htmlContent = null) => {
  if (!to) {
    throw new Error("Recipient email is missing");
  }

  // Base payload
  const payload = {
    from: {
      email: process.env.MAILERSEND_FROM, // MUST be verified domain email
      name: "MINIMAL",
    },
    to: [{ email: to }],
    subject,
    text,
  };

  // Add HTML only if provided
  if (htmlContent) {
    payload.html = htmlContent;
  }

  try {
    const res = await axios.post(
      "https://api.mailersend.com/v1/email",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent successfully");
    return res.data;
  } catch (err) {
    console.error(
      "❌ MailerSend error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

module.exports = sendEmail;
