const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const connection = require("../configs/db.config");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const user_id = email.split("@")[0];
  const joined_date = new Date().toISOString().replace(/T.*/, "");
  let query;

  await bcrypt.hash(password, 10, function (err, hash) {
    if (err) console.log(err);
    console.log(hash);
    query = `INSERT INTO users (user_id, username, email, password_hash, joined_date) values ("${user_id}", "${username}", "${email}", "${hash}", "${joined_date}")`;
  });

  connection.query(query, (err, data) => {
    if (err) {
      return res.json({ ok: false, err: err });
    }
    return res.json({ status: "ok", ok: true });
  });
});

// router.get("/", (req, res) => {
//   const query = "SELECT * FROM users";
//   connection.query(query, (err, data) => {
//     if (err) {
//       res.json({ ok: false });
//     }
//     res.json({ status: "ok", ok: true, data: data });
//   });
// });

module.exports = router;
