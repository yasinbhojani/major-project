const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const connection = require("../configs/db.config");
const mail = require("../services/mail");
const generateRandomOTP = require("../utils/otp.util");

let OTP = "";

router.post("/verify", async (req, res) => {
  const { name, email } = req.body;
  console.log("Verify Backend");
  console.log(req.body);

  OTP = generateRandomOTP();
  const response = mail({ name, email, type: "otp", otp: OTP });
  
  console.log("mail response")
  console.log(response);
  res.json({ ok: true });
});

router.post("/register", async (req, res) => {
  const { username, email, password, otp } = req.body;
  console.log(req.body + "register");

  if (otp !== OTP) {
    res.json({ ok: false, message: "Invalid OTP" });
  }

  connection.query(
    "SELECT COUNT(*) as qty FROM users WHERE email = ?",
    [email],
    (err, data) => {
      if (err) {
        res.json({ ok: false, message: "an error occured" });
      }
      if (data[0].qty > 0) {
        return res
          .status(400)
          .json({ ok: false, message: "Email already exists" });
      } else {
        const user_id = email.split("@")[0];
        const joined_date = new Date().toISOString().replace(/T.*/, "");

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
      }
    }
  );
});

module.exports = router;
