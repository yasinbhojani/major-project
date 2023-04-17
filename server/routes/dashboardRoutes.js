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

module.exports = router;
