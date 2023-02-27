const transporter = require("../configs/nodemailer.config");
const { otpMessage, welcomeMessage } = require("../utils/messages.util");

const mail = (config) => {
  const { name, email, type, otp } = config;

  let content = {};
  if (type === "otp") {
    content = otpMessage(name, otp);
  } else if (type === "welcome") {
    content = welcomeMessage(name);
  }

  const mailOptions = {
    from: '"Shell" <shellproject.services@gmail.com>',
    to: email,
    subject: content.subject,
    html: content.html,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = mail;
