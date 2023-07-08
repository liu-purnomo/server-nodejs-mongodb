const nodemailer = require("nodemailer");

const sendEmail = (email, token) => {
  const mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "noreply@yourdomain.com",
    to: email,
    subject: "Email verification - yourdomain.com",
    html: `<p>You requested for email verification, kindly use  <a href="https://yourdomain.com/confirmation?email=${email}&token=${token}"> this link </a> to verify your email address </p><p>Or using key bellow</p><h1>${token}</h1>`,
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      return 1;
    } else {
      return 0;
    }
  });
};

module.exports = sendEmail;
