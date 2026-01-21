require("dotenv").config();
const axios = require("axios");


const sendEmail = async (to, subject, text, htmlContent = null) => {
  if (!to) {
    throw new Error("Recipient email is missing");
  }


  const payload = {
    from: {
      email: process.env.MAILERSEND_FROM, 
      name: "MINIMAL",
    },
    to: [{ email: to }],
    subject,
    text,
  };


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

    console.log(" Email sent successfully");
    return res.data;
  } catch (err) {
    console.error(
      " MailerSend error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

module.exports = sendEmail;
