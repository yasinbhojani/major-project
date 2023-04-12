// imports
const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");
const verify = require("../middlewares/verifyToken");

router.get("/:userName", [verify], (req, res) => {
  const { userName } = req.params;
  connection.query(
    `SELECT notifications.notification_id, notifications.notification_from, notifications.notification_for, notifications.content, notifications.sent_date, notifications.notification_type, users.username, users.avatar_url  FROM notifications INNER JOIN users ON notifications.notification_from = users.user_id WHERE notifications.notification_for = "${userName}" ORDER BY notifications.sent_date DESC;`,
    (err, data) => {
      res.send(data);
    }
  );
});

module.exports = router;
