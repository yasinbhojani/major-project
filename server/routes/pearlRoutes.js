const express = require("express");
const router = express.Router();
const verify = require("../middlewares/verifyToken");
const { v4: uuid } = require("uuid");

const connection = require("../configs/db.config");

router.get("/post", (req, res) => {
  const { page_no } = req.query;
  // const user = req.user;
  const limit = 20 * (page_no - 1);

  // this query will be subject to modifications in a future update as to getting posts for a particular user.
  connection.query("SELECT COUNT(*) as total_posts FROM posts", (err, data) => {
    if (err) {
      return res.json({ ok: false, message: "An Error Occured" });
    }

    const totalData = data[0].total_posts;

    connection.query(
      "select users.username, users.avatar_url, users.followers, posts.post_id, posts.author_id, posts.post_content, posts.media_url, posts.likes, posts.comments, posts.created_date from users inner join posts on users.user_id = posts.author_id order by posts.created_date desc LIMIT ?, 20",
      [limit],
      (err, data) => {
        if (err) {
          return res.json({ ok: false, message: "An Error Occured" });
        } else {
          return res.json({ ok: true, records: totalData, data: data });
        }
      }
    );
  });
});

router.post("/post", [verify], (req, res) => {
  const { user_id } = req.user;
  const content = req.body.pearlContent;
  const mediaurl = req.body.mediaURL;

  connection.query(
    `INSERT INTO posts (post_id, author_id, post_content, media_url, created_date) values ("${uuid()}", "${user_id}", "${content}", "${mediaurl}", now())`,
    (err, data) => {
      if (err) {
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
