// imports
const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");
const verify = require("../middlewares/verifyToken");
const { followUser } = require("../controllers/followUserController");

// Logic To retrive Users Data From Databses
router.get("/openProfile/:userId", [verify], (req, res) => {
  const { userId } = req.params;
  const { user_id: logged_user_id } = req.user;
  if (userId !== undefined) {
    connection.query(
      `SELECT u.*, CASE WHEN f.following_id IS NULL THEN FALSE ELSE TRUE END AS is_following FROM users u LEFT JOIN user_followers f ON u.user_id = f.following_id AND f.follower_id = "${logged_user_id}" WHERE u.user_id = "${userId}";`,
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
router.put("/update/:user_id", [verify], (req, res) => {
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

router.post("/follow", [verify], followUser);

// Who to follow
router.get("/whotofollow", (req, res) => {
  connection.query(
    `SELECT * FROM users ORDER BY RAND() LIMIT 3; `,
    (err, data) => {
      res.send(data);
    }
  );
});
module.exports = router;
