const transporter = require("../configs/nodemailer.config");
const { otpMessage, welcomeMessage } = require("../utils/messages.util");

const mail = (config) => {
  const { name, email, type, otp } = config;
  console.log(config);

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

  console.log(transporter);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Mail error")
      console.log(error)
      return { staus: "error", error: "email not sent" };
    } else {
      console.log("Mail send")
      return { staus: "ok" };
    }
  });
};

module.exports = mail;
