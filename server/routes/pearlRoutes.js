const express = require("express");
const router = express.Router();
const verify = require("../middlewares/verifyToken");
const { v4: uuid } = require("uuid");

const connection = require("../configs/db.config");

router.post("/post", [verify], (req, res) => {
  const { user_id } = req.user;
  const content = req.body.pearlContent;

  connection.query(
    `INSERT INTO posts (post_id, author_id, post_content, created_date) values ("${uuid()}", "${user_id}", "${content}", now())`,
    (err, data) => {
      if (err) {
        console.log(err);
        return res.json({
          ok: false,
          message: "An error occured while posting",
        });
      }

      return res.json({ ok: true, message: "Posted Succesfully" });
    }
  );
});

module.exports = router;
