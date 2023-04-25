//* GET "api/profile/user"

const connection = require("../configs/db.config");

const getUser = (req, res) => {
  const { user_id } = req.user;

  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    [user_id],
    (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ ok: false, message: "An error occured" });
      }

      return res.json({ ok: true, user_data: data[0] });
    }
  );
};

module.exports = { getUser };
