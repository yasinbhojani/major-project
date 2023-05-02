const { v4: uuid } = require("uuid");
const connection = require("../configs/db.config");
const getUserID = require("../utils/getuserid.util");

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

          getUserID(post_id).then((result) => {
            let notification_for_user_id = result[0][0].author_id;
            connection.query(
              `INSERT INTO notifications VALUES ("${uuid().substring(
                0,
                5
              )}","${user_id}","${notification_for_user_id}","commented on your post",now(),"comment");`,
              (err, data) => {
                if (err) {
                  console.log(err);
                  return res.json({ ok: false, message: "An error occured" });
                }
                return res.json({ ok: true, message: "operation successful" });
              }
            );
          });
        }
      );
    }
  );
};

//* GET "/api/pearl/comments"
const getComments = (req, res) => {
  const { post_id } = req.query;

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
