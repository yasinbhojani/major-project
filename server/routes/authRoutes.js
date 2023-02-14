// imports
const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");

// middlewares
const { emailExists } = require("../middlewares/emailExists");
const { sendOTP, verifyOTP } = require("../middlewares/otpVerification");
const { hashPassword } = require("../middlewares/hashPassword");

//! Route to Check If email exists
router.post("/checkemail", emailExists);

//! Route to send the OTP
router.post("/otp/send", sendOTP);

//! Route to verify the OTP
router.post("/register", [verifyOTP, hashPassword], async (req, res) => {
  // destructring user data and entered otp
  const { name, email } = req.body;
  const { password_hash } = req;

  // Generating user_id and joined_date
  const user_id = email.split("@")[0];
  const joined_date = new Date().toISOString().replace(/T.*/, "");

  const query = `INSERT INTO users (user_id, username, email, password_hash, joined_date) values ("${user_id}", "${name}", "${email}", "${password_hash}", "${joined_date}")`;

  connection.query(query, (err, data) => {
    if (err) {
      return res.json({ ok: false, message: err });
    }
    return res.json({ status: "ok", ok: true });
  });
});

module.exports = router;
