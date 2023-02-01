const nodemailer = require("nodemailer");

const transporter = require("../configs/nodemailer.config");
const generateRandomOTP = require("../utils/otp.util");

const mail = async (req, res) => {
  const { name, email } = req.body;

  const mailOptions = {
    from: '"Shell" <shellproject.services@gmail.com>',
    to: email,
    subject: "Please verify your email",
    html: `
      <p>Hey ${name},</p>
      <p>Welcome to Shell!</p>
      <p>Before we get started, Authenticate your email with the given OTP,</p>
      
      <p>
        <b>OTP:</b>
      </p>
      <span style="color: blue; font-size:larger; font-weight: bold;">${generateRandomOTP()}</span>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send({ staus: "error", error: "email not sent" });
    } else {
      console.log(info);
      res.send({ staus: "ok" });
    }
  });
};

module.exports = mail;
