const { v4: uuid } = require("uuid");
const connection = require("../configs/db.config");

//* POST "/api/pearl/comment"
const addComment = (req, res) => {
  const { comment, postID: post_id } = req.body;
  const { user_id } = req.user;

  const comment_id = uuid();

  connection.query(
    "INSERT INTO comments (comment_id, post_id, user_id, comment_content, created_date) VALUES (?, ?, ?, ?, now());",
    [comment_id, post_id, user_id, comment],
    (err, data) => {
      if (err) {
        console.log(err);
        return res.json({
          ok: false,
          message: "An error occured while commenting",
        });
      }

      connection.query(
        "UPDATE posts SET comments = comments + 1 WHERE post_id = ?",
        [post_id],
        (err, data) => {
          if (err) {
            return res.json({
              ok: false,
              message: "An error occured while commenting",
            });
          }
          
          res.json({ ok: true, message: "operation successful" });
        }
      );
    }
  );
};

//* GET "/api/pearl/comments"
const getComments = (req, res) => {
  const { post_id } = req.query;

  console.log(post_id);

  connection.query(
    "SELECT comments.comment_id, comments.comment_content, comments.created_date, users.user_id, users.username, users.avatar_url, users.followers FROM comments INNER JOIN users ON comments.user_id = users.user_id WHERE comments.post_id = ? ORDER BY created_date DESC",
    [post_id],
    (err, data) => {
      if (err) {
        return res.json({
          ok: false,
          message: "an error occured while fetching comments",
        });
      }

      res.json({ ok: true, comments: data });
    }
  );
};

module.exports = { addComment, getComments };
