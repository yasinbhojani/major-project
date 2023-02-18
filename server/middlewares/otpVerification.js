const mail = require("../services/mail");
const generateRandomOTP = require("../utils/otp.util");

let OTP = "";

const sendOTP = (req, res, next) => {
  const { name, email } = req.body;
  const firstName = name.split(" ")[0];

  OTP = generateRandomOTP();
  mail({ name: firstName, email, type: "otp", otp: OTP });

  res.json({ ok: true, message: `OTP sent to ${email}` });
};

const verifyOTP = (req, res, next) => {
  const { otp } = req.body;

  if (otp != OTP) {
    return res.json({ ok: false, message: "Invalid OTP" });
  } else {
    next();
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
};
