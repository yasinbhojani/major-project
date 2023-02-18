// imports
const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");
const bcrypt = require("bcryptjs");

// middlewares
const { emailExists } = require("../middlewares/emailExists");
const { sendOTP, verifyOTP } = require("../middlewares/otpVerification");
const { hashPassword } = require("../middlewares/hashPassword");

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

      bcrypt.compare(password, data[0].password_hash, (err, result) => {
        if (err) return res.json({ ok: false, message: "An error occured" });

        if (!result)
          return res.json({ ok: false, message: "Incorrect Password" });

        return res.json({
          ok: true,
          message: "Login Successful",
          payload: {
            user_id: data[0].user_id,
            email: data[0].email,
          },
        });
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

  // Generating user_id and joined_date
  const user_id = email.split("@")[0];
  // const joined_date = new Date().toISOString().replace(/T.*/, "");

  const query = `INSERT INTO users (user_id, username, email, password_hash, joined_date) values ("${user_id}", "${name}", "${email}", "${password_hash}", now())`;

  connection.query(query, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ ok: false, message: "an error occured in database" });
    }
    return res.json({ status: "ok", ok: true });
  });
});

module.exports = router;
