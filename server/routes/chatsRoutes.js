// imports
const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");

router.get("/:sender/:reciver", (req, res) => {
  const { sender, reciver } = req.params;
  connection.query(
    `SELECT * FROM chats WHERE sender_id="${sender}" AND reciver_id="${reciver}" OR sender_id="${reciver}" AND reciver_id="${sender}" order by sent_date`,
    (err, data) => {
      res.send(data);
    }
  );
});

router.get("/firends/:user_id", (req, res) => {
  const { user_id } = req.params;
});

module.exports = router;
