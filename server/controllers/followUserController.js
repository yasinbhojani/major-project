const connection = require("../configs/db.config");
const { v4: uuid } = require("uuid");

const followUser = (req, res, next) => {
  const { following_id, flag } = req.body;
  const follower_user = req.user;
  const follower_id = follower_user.user_id;

  let query =
    "INSERT INTO user_followers  (follower_id, following_id, followed_date) VALUES (?, ?, NOW())";

  if (flag === "unfollow") {
    query =
      "DELETE FROM user_followers WHERE follower_id = ? AND following_id = ?";
  }

  connection.query(query, [follower_id, following_id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ ok: false, message: "An error occured" });
    }

    let q1 = "UPDATE users SET followers = followers + 1 WHERE user_id = ?";
    let q2 = "UPDATE users SET following = following + 1 WHERE user_id = ?";

    if (flag === "unfollow") {
      q1 = "UPDATE users SET followers = followers - 1 WHERE user_id = ?";
      q2 = "UPDATE users SET following = following - 1 WHERE user_id = ?";
    }

    connection.query(q1, [following_id]);
    connection.query(q2, [follower_id]);

    if (flag === "follow") {
      connection.query(
        `INSERT INTO notifications VALUES ("${uuid().substring(
          0,
          5
        )}","${follower_id}","${following_id}","started following you",now(),"follow");`,
        (err, data) => {
          if (err) {
            console.log(err);
            return res.json({ ok: false, message: "An error occured" });
          }
          return res.json({
            ok: true,
            message: `${follower_id} is now following ${following_id}`,
          });
        }
      );
    } else {
      return res.json({
        ok: true,
        message: `${follower_id} has now unfollowed ${following_id}`,
      });
    }
  });
};

module.exports = { followUser };
