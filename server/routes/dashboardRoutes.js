// imports
const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");
const verify = require("../middlewares/verifyToken");

router.post("/SQLW", [verify], (req, res) => {
  const { query } = req.body;
  connection.query(`${query}`, (err, data) => {
    res.send(data);
  });
});

router.get("/storage/avatar", [verify], (req, res) => {
  connection.query(`select avatar_url,username from users;`, (err, data) => {
    res.send(data);
  });
});

router.get("/storage/posts", [verify], (req, res) => {
  connection.query(`select media_url,author_id from posts; `, (err, data) => {
    res.send(data);
  });
});

router.get("/analytics/accounts", [verify], (req, res) => {
  connection.query(
    `SELECT count(*) as users_joined, DATE(joined_date) dateonly FROM users group by dateonly order by dateonly;`,
    (err, data) => {
      res.send(data);
    }
  );
});

router.get("/analytics/pearls", [verify], (req, res) => {
  connection.query(
    `SELECT count(*) as users_posts, DATE(created_date) dateonly FROM posts group by dateonly order by dateonly;`,
    (err, data) => {
      res.send(data);
    }
  );
});

router.get("/analytics/chats", [verify], (req, res) => {
  connection.query(
    `SELECT count(*) as users_chats, DATE(sent_date) dateonly FROM chats group by dateonly order by dateonly;`,
    (err, data) => {
      res.send(data);
    }
  );
});

router.get("/analytics/likes", [verify], (req, res) => {
  connection.query(
    `SELECT count(*) as users_likes, DATE(liked_at) dateonly FROM likes group by dateonly order by dateonly;`,
    (err, data) => {
      res.send(data);
    }
  );
});

module.exports = router;
