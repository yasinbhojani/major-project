const connection = require("../configs/db.config");

//* GET "/api/pearl/bookmarks?page_no={pageNo}"
const getBookmarks = (req, res) => {
  const { page_no } = req.query;
  const { user_id } = req.user;

  // const user = req.user;
  const limit = 20 * (page_no - 1);
  let count_query =
    "SELECT COUNT(*) as total_posts FROM bookmarks WHERE user_id = ?";

  connection.query(count_query, [user_id], (err, data) => {
    if (err) {
      return res.json({ ok: false, message: "An Error Occured" });
    }

    const totalData = data[0].total_posts;

    let query = `SELECT u.username, u.avatar_url, u.followers, p.post_id, p.author_id, p.post_content, p.media_url, p.likes, p.comments, p.created_date, p.bookmarks, b.user_id AS bookmarked_by, CASE WHEN (SELECT COUNT(*) FROM likes WHERE user_id = '${user_id}' AND post_id = p.post_id) > 0 THEN true ELSE false END AS 'like_exists', CASE WHEN (SELECT COUNT(*) FROM bookmarks WHERE user_id = '${user_id}' AND post_id = p.post_id) > 0 THEN true ELSE false END AS 'bookmark_exists' FROM users u JOIN posts p ON u.user_id = p.author_id JOIN bookmarks b ON b.post_id = p.post_id WHERE b.user_id = '${user_id}' ORDER BY b.bookmarked_date DESC LIMIT ${limit}, 20;`;

    connection.query(query, (err, data) => {
      if (err) {
        return res.json({ ok: false, message: "An Error Occured" });
      } else {
        return res.json({ ok: true, records: totalData, data: data });
      }
    });
  });
};

module.exports = { getBookmarks };
