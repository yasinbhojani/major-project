// imports
const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");

// Logic To retrive Users Data From Databses
router.get("/openProfile/:userId", (req, res) => {
  const { userId } = req.params;
  if (userId !== undefined) {
    connection.query(
      `SELECT * FROM users WHERE user_id = "${userId}"`,
      (err, data) => {
        if (data.length !== 0) {
          res.json({
            ok: true,
            ...data[0],
          });
        } else {
          res.json({
            ok: false,
          });
        }
      }
    );
  }
});

// Logic for Searching of user
router.get("/searchProfile/:query", (req, res) => {
  const { query } = req.params;
  connection.query(
    `SELECT * FROM users WHERE username LIKE "%${query}%" OR user_id LIKE "%${query}%"`,
    (err, data) => {
      if (data.length !== 0) {
        res.json({
          ok: true,
          profiles: data,
        });
      } else {
        res.json({
          ok: false,
          profiles: ["no users"],
        });
      }
    }
  );
});

// Updating User Profile
router.put("/update/:user_id", (req, res) => {
  const { name, bio, imgUrl, phoneNo, location } = req.body;
  const { user_id } = req.params;
  // Name Updattion
  if (name !== undefined && name.trim() !== "") {
    connection.query(
      `update users set username = "${name}" where user_id = "${user_id}"`
    );
  }
  // Bio Updattion
  if (bio !== undefined && bio.trim() !== "") {
    connection.query(
      `update users set bio = "${bio}" where user_id = "${user_id}"`
    );
  }
  // Profile Photo Url Update
  if (imgUrl !== "") {
    connection.query(
      `update users set avatar_url = "${imgUrl}" where user_id = "${user_id}"`
    );
  }
  // phone no Updattion
  if (phoneNo !== undefined && phoneNo.trim() !== "") {
    connection.query(
      `update users set mobile = "${phoneNo}" where user_id = "${user_id}"`
    );
  }
  // location updation
  if (location !== undefined && location.trim() !== "") {
    connection.query(
      `update users set location = "${location}" where user_id = "${user_id}"`
    );
  }
});
module.exports = router;
