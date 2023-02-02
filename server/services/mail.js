const transporter = require("../configs/nodemailer.config");
const { otpMessage, welcomeMessage } = require("../utils/messages.util");

const mail = (req, res) => {
  const { name, email, type } = req.body;

  let content = {};
  if (type === "otp") {
    content = otpMessage(name);
  } else if (type === "welcome") {
    content = welcomeMessage(name);
  }

  const mailOptions = {
    from: '"Shell" <shellproject.services@gmail.com>',
    to: email,
    subject: content.subject,
    html: content.html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send({ staus: "error", error: "email not sent" });
    } else {
      res.send({ staus: "ok" });
    }
  });
};

module.exports = mail;
