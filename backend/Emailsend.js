require("dotenv").config();
const axios = require("axios");

const sendEmail = async (to, subject, text) => {
  try {
    await axios.post(
      "https://api.mailersend.com/v1/email",
      {
        from: {
          email: process.env.MAILERSEND_FROM, // verified sender
          name: "MINIMAL",
        },
        to: [{ email: to }],
        subject,
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent");
  } catch (err) {
    console.error(
      "❌ MailerSend error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

module.exports = sendEmail;
