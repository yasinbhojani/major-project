// imports
const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");

router.get("/conversation/:user_id", (req, res) => {
  const { user_id } = req.params;
  let arrayOfConversation = [];
  connection.query(
    `SELECT * FROM conversation WHERE user1="${user_id}" OR user2="${user_id} ORDER BY sent_date DESC";`,
    (err, data) => {
      for (let user in data) {
        if (data[user].user1 === user_id) {
          arrayOfConversation.push({
            user: data[user].user2,
            message: data[user].last_message,
          });
        } else {
          arrayOfConversation.push({
            user: data[user].user1,
            message: data[user].last_message,
          });
        }
      }
      res.send(arrayOfConversation);
    }
  );
});

router.get("/:sender/:reciver", (req, res) => {
  const { sender, reciver } = req.params;
  connection.query(
    `SELECT * FROM chats WHERE sender_id="${sender}" AND reciver_id="${reciver}" OR sender_id="${reciver}" AND reciver_id="${sender}" order by sent_date`,
    (err, data) => {
      res.send(data);
    }
  );
});

module.exports = router;
