const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const connection = require("../configs/db.config");
const mail = require("../services/mail");
const generateRandomOTP = require("../utils/otp.util");

let OTP = "";

//! Route to Check If email exists
router.post("/checkemail", async (req, res) => {
  const { email } = req.body;

  // checking if email exists by querying
  connection.query(
    "SELECT count(*) as qty FROM users WHERE email = ?",
    [email],
    (err, data) => {
      if (err) {
        return res.json({
          ok: false,
          message: "An Error occured, Please try again",
        });
      }

      if (data[0].qty > 0) {
        return res.json({ ok: false, message: "Email Already Exists" });
      } else {
        return res.json({ ok: true });
      }
    }
  );
});

//! Route to send the OTP
router.post("/verify", async (req, res) => {
  const { name, email } = req.body;

  const firstName = name.split(" ")[0];

  OTP = generateRandomOTP();
  mail({ name: firstName, email, type: "otp", otp: OTP });

  res.json({ ok: true });
});

//! Route to verify the OTP
router.post("/register", async (req, res) => {
  // destructring user data and entered otp
  const { username, email, password, otp } = req.body;

  // checking if entered OTP is similar to generated OTP
  if (otp !== OTP) {
    return res.json({ ok: false, message: "Invalid OTP" });
  }

  // Generating user_id and joined_date
  const user_id = email.split("@")[0];
  const joined_date = new Date().toISOString().replace(/T.*/, "");

  // Hashing the password (Do not store the passwords directly)
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) res.json({ ok: false, message: "an error occured" });

    const query = `INSERT INTO users (user_id, username, email, password_hash, joined_date) values ("${user_id}", "${username}", "${email}", "${hash}", "${joined_date}")`;

    connection.query(query, (err, data) => {
      if (err) {
        return res.json({ ok: false, message: err });
      }
      return res.json({ status: "ok", ok: true });
    });
  });
});

module.exports = router;
