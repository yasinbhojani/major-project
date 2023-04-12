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

module.exports = router;
