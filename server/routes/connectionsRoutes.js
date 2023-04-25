// imports
const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");
const verify = require("../middlewares/verifyToken");

router.get("/following/:user", (req, res) => {
  const { user } = req.params;
  connection.query(
    `SELECT u.user_id, u.avatar_url, u.username,u.followers
    FROM users u
    JOIN user_followers uf ON u.user_id = uf.following_id
    WHERE uf.follower_id = '${user}';
    `,
    (err, data) => {
      res.send(data);
    }
  );
});

router.get("/followers/:user", (req, res) => {
  const { user } = req.params;
  connection.query(
    `SELECT u.user_id, u.username, u.avatar_url, u.followers
    FROM user_followers AS uf
    INNER JOIN users AS u ON uf.follower_id = u.user_id
    WHERE uf.following_id = '${user}';`,
    (err, data) => {
      res.send(data);
    }
  );
});

module.exports = router;
