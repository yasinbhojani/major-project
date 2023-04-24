// imports
const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");
const bcrypt = require("bcryptjs");

// middlewares
const { emailExists } = require("../middlewares/emailExists");
const { sendOTP, verifyOTP } = require("../middlewares/otpVerification");
const { hashPassword } = require("../middlewares/hashPassword");
const verify = require("../middlewares/verifyToken");

// Utils
const { generateAccessToken } = require("../utils/token.util");
const mail = require("../utils/mail.util");

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
              user: data[0],
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

  connection.query(query, (err, data) => {
    if (err) {
      return res.json({ ok: false, message: "an error occured in database" });
    }

    const firstName = name.split(" ")[0];
    mail({ name: firstName, email, type: "welcome" });

    const query = `SELECT * FROM users WHERE user_id = "${user_id}"`;
    connection.query(query, (err, data) => {
      if (err) {
        return res.json({ ok: false, message: "An error occured" });
      }

      const accessToken = generateAccessToken(data[0]);

      return res.json({
        ok: true,
        message: "Signup Succesful",
        payload: {
          user: data[0],
          is_admin: data[0].is_admin,
          accessToken,
        },
      });
    });
  });
});

//! Route to check if user is admin

router.get("/isadmin", [verify], (req, res) => {
  const user = req.user;
  connection.query(
    "select is_admin from users where user_id = ?",
    [user.user_id],
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ ok: false, message: "An error occured" });
      }
      if (data[0].is_admin === 1) {
        return res
          .status(200)
          .json({ ok: true, message: "user is admin", is_admin: true });
      } else {
        return res.json({
          ok: true,
          message: "user is not admin",
          is_admin: false,
        });
      }
    }
  );
});

module.exports = router;
