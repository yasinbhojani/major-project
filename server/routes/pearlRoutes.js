const express = require("express");
const router = express.Router();
const verify = require("../middlewares/verifyToken");
const { v4: uuid } = require("uuid");

const connection = require("../configs/db.config");

router.get("/post", [verify], (req, res) => {
  const { post_id } = req.query;
  const user = req.user;

  connection.query(
    "SELECT users.username, users.avatar_url, users.followers, posts.post_id, posts.author_id, posts.post_content, posts.media_url, posts.likes, posts.comments, posts.created_date, posts.bookmarks, CASE WHEN (SELECT COUNT(*) FROM likes WHERE likes.user_id = ? AND likes.post_id = posts.post_id) > 0 THEN true ELSE false END AS 'like_exists', CASE WHEN (SELECT COUNT(*) FROM bookmarks WHERE bookmarks.user_id = ? AND bookmarks.post_id = posts.post_id) > 0 THEN true ELSE false END AS 'bookmark_exists' FROM posts INNER JOIN users ON users.user_id = posts.author_id WHERE posts.post_id = ?",
    [user.user_id, user.user_id, post_id],
    (err, data) => {
      if (err) {
        res.json({ ok: false, message: "An error occured" });
      }

      if (data.length === 0) {
        res.json({ ok: false, message: "Pearl doesn't exist" });
      }

      res.json({ ok: true, post: data[0] });
    }
  );
});

router.get("/posts", [verify], (req, res) => {
  const { page_no } = req.query;
  const { user_id } = req.query;
  const user = req.user;

  // const user = req.user;
  const limit = 20 * (page_no - 1);
  let count_query = "SELECT COUNT(*) as total_posts FROM posts";

  if (user_id) {
    count_query = `SELECT COUNT(*) as total_posts FROM posts WHERE author_id = "${user_id}"`;
  }

  connection.query(count_query, (err, data) => {
    if (err) {
      return res.json({ ok: false, message: "An Error Occured" });
    }

    const totalData = data[0].total_posts;

    // this query will be subject to modifications in a future update as to getting posts for a particular user.
    let query = `SELECT users.username, users.avatar_url, users.followers, posts.post_id, posts.author_id, posts.post_content, posts.media_url, posts.likes, posts.comments, posts.created_date, posts.bookmarks, CASE WHEN (SELECT COUNT(*) FROM likes WHERE likes.user_id = '${user.user_id}' AND likes.post_id = posts.post_id) > 0 THEN true ELSE false END AS 'like_exists', CASE WHEN (SELECT COUNT(*) FROM bookmarks WHERE bookmarks.user_id = '${user.user_id}' AND bookmarks.post_id = posts.post_id) > 0 THEN true ELSE false END AS 'bookmark_exists' FROM posts INNER JOIN users ON users.user_id = posts.author_id ORDER BY posts.created_date DESC LIMIT ${limit}, 20;`;

    if (user_id) {
      query = `SELECT users.username, users.avatar_url, users.followers, posts.post_id, posts.author_id, posts.post_content, posts.media_url, posts.likes, posts.comments, posts.created_date, posts.bookmarks, CASE WHEN (SELECT COUNT(*) FROM likes WHERE likes.user_id = '${user_id}' AND likes.post_id = posts.post_id) > 0 THEN true ELSE false END AS 'like_exists', CASE WHEN (SELECT COUNT(*) FROM bookmarks WHERE bookmarks.user_id = '${user.user_id}' AND bookmarks.post_id = posts.post_id) > 0 THEN true ELSE false END AS 'bookmark_exists' FROM posts INNER JOIN users ON users.user_id = posts.author_id WHERE users.user_id = "${user_id}" ORDER BY posts.created_date DESC LIMIT ${limit}, 20;`;
    }

    connection.query(query, (err, data) => {
      if (err) {
        return res.json({ ok: false, message: "An Error Occured" });
      } else {
        return res.json({ ok: true, records: totalData, data: data });
      }
    });
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

router.post("/like", [verify], (req, res) => {
  // operation_flag consists of 'like' or 'unlike'
  const operation_flag = req.body.flag;
  const post_id = req.body.post_id;
  const { user_id } = req.user;

  let likes_table_query;
  let posts_table_query;

  if (operation_flag === "like") {
    likes_table_query = `INSERT INTO likes values ("${uuid()}", "${user_id}", "${post_id}", now() )`;
    posts_table_query = `UPDATE posts SET likes = likes + 1 WHERE post_id = "${post_id}"`;
  }

  if (operation_flag === "unlike") {
    likes_table_query = `DELETE FROM likes WHERE user_id = "${user_id}" AND post_id = "${post_id}"`;
    posts_table_query = `UPDATE posts SET likes = likes - 1 WHERE post_id = "${post_id}"`;
  }

  connection.query(likes_table_query, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ ok: false, message: "An error occured" });
    }

    connection.query(posts_table_query, (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ ok: false, message: "An error occured" });
      }
      res.json({ ok: true, message: "operation successful" });
    });
  });
});

router.post("/bookmark", [verify], (req, res) => {
  // operation_flag consists of 'bookmark' or 'unbookmark'
  const operation_flag = req.body.flag;
  const post_id = req.body.post_id;
  const { user_id } = req.user;

  let bookmarks_table_query;
  let posts_table_query;

  if (operation_flag === "bookmark") {
    bookmarks_table_query = `INSERT INTO bookmarks values ("${user_id}", "${post_id}", now())`;
    posts_table_query = `UPDATE posts SET bookmarks = bookmarks + 1 WHERE post_id = "${post_id}"`;
  }

  if (operation_flag === "unbookmark") {
    bookmarks_table_query = `DELETE FROM bookmarks WHERE user_id = "${user_id}" AND post_id = "${post_id}"`;
    posts_table_query = `UPDATE posts SET bookmarks = bookmarks - 1 WHERE post_id = "${post_id}"`;
  }

  connection.query(bookmarks_table_query, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ ok: false, message: "An error occured" });
    }

    connection.query(posts_table_query, (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ ok: false, message: "An error occured" });
      }
      res.json({ ok: true, message: "operation successful" });
    });
  });
});

module.exports = router;
