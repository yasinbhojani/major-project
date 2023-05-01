const connection = require("../configs/db.config");
const bcrypt = require("bcryptjs");
const { hashPasswordByArgs } = require("../middlewares/hashPassword");

const changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user;

  // query is made for the user data of the user who wants to change the password
  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    [user.user_id],
    (err, data) => {
      if (err) {
        return res.json({ ok: false, message: "An error occured" });
      }

      // hash stored in the database and password entered are compared
      bcrypt.compare(oldPassword, data[0].password_hash, (err, result) => {
        if (err) {
          return res.json({ ok: false, message: "An error occured" });
        }

        // if the result is false function is terminated and the control is returned to frontend
        if (!result) {
          return res.json({ ok: false, message: "Incorrect old password" });
        } else {
          // if the result is true new password is hashed and updated in the database
          hashPasswordByArgs(newPassword).then((password_hash) => {
            connection.query(
              "UPDATE users SET password_hash = ? WHERE user_id = ?",
              [password_hash, user.user_id],
              (err, data) => {
                if (err) {
                  return res.json({ ok: false, message: "An error occured" });
                }

                return res.json({
                  ok: true,
                  message: "Password changed successfully",
                });
              }
            );
          });
        }
      });
    }
  );
};

module.exports = { changePassword };
