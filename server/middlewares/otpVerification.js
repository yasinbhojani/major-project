const mail = require("../services/mail");
const generateRandomOTP = require("../utils/otp.util");

let OTP = "";

const sendOTP = async (req, res, next) => {
  const { name, email } = req.body;
  const firstName = name.split(" ")[0];

  OTP = generateRandomOTP();

  mail({
    name: firstName,
    email,
    type: "otp",
    otp: OTP,
  })
    .then((result) => {
      console.log("mail sent");
      res.status(200).json({ ok: true, message: `OTP sent to ${email}` });
    })
    .catch((err) => {
      console.log("error");
      res.status(401).json({ ok: false, message: response.message });
    });
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
