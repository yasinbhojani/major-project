// imports
const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");
const bcrypt = require("bcryptjs");

// middlewares
const { emailExists } = require("../middlewares/emailExists");
const { sendOTP, verifyOTP } = require("../middlewares/otpVerification");
const { hashPassword } = require("../middlewares/hashPassword");

// Utils
const { generateAccessToken } = require("../utils/token.util");
const mail = require("../services/mail");

//! Route for Login
router.post("/login", (req, res) => {
  // verify if email and passowrd exist in the database
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, data) => {
      if (err) {
        return res.json({ ok: false, message: "An error occured" });
      }

      if (data.length === 0) {
        return res.json({ ok: false, message: "Email doesn't exist" });
      }

      // Check if password hashes are correct by comparing.
      bcrypt.compare(password, data[0].password_hash, (err, result) => {
        if (err) return res.json({ ok: false, message: "An error occured" });

        if (!result)
          return res.json({ ok: false, message: "Incorrect Password" });
        else {
          const accessToken = generateAccessToken(data[0]);

          return res.json({
            ok: true,
            message: "Login Successful",
            payload: {
              username: data[0].username,
              is_admin: data[0].is_admin,
              accessToken,
            },
          });
        }
      });
    }
  );
});

//! Route to Check If email exists
router.post("/checkemail", emailExists);

//! Route to send the OTP
router.post("/otp/send", sendOTP);

//! Route to verify the OTP and register user
router.post("/register", [verifyOTP, hashPassword], async (req, res) => {
  // destructring user data and entered otp
  const { name, email } = req.body;
  const { password_hash } = req;

  // Generating user_id
  const user_id = email.split("@")[0].toLowerCase();
  // const joined_date = new Date().toISOString().replace(/T.*/, "");

  const query = `INSERT INTO users (user_id, username, email, password_hash, joined_date) values ("${user_id}", "${name}", "${email}", "${password_hash}", now())`;

  connection.query(query, async (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ ok: false, message: "an error occured in database" });
    }

    const firstName = name.split(" ")[0];

    const response = await mail({ name: firstName, email, type: "welcome" });
    if (response.ok) {
      res.status(200).json({ ok: true, message: `OTP sent to ${email}` });
    } else {
      res.status(401).json({ ok: false, message: response.message });
    }
  });
});

module.exports = router;
