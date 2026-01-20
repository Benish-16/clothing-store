require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, textMessage, htmlContent = null) => {
  if (!email) {
    throw new Error("Recipient email is missing");
  }

  // Create transporter with explicit host/port for Gmail
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,       // 587 for STARTTLS, 465 for SSL
    secure: false,   // STARTTLS uses false
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.EMAIL_PASSWORD, // must be App Password if 2FA enabled
    },
    tls: {
      rejectUnauthorized: false, // allows cloud servers to connect
    },
  });

  // Prepare email
  const mailOptions = {
    from: `"MINIMAL" <${process.env.MY_EMAIL}>`, // sender
    to: email,                                  // recipient
    subject,
    text: textMessage,
    html: htmlContent || undefined,             // optional HTML
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!", info.response);
    return info;
  } catch (err) {
    console.error("Email sending failed:", err);
    throw err;
  }
};

module.exports = sendEmail;

