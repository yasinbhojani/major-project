// imports
const connection = require("../configs/db.config");

// Middleware to check if email exists.
const emailExists = (req, res, next) => {
  const { email } = req.body;

  connection.query(
    "SELECT count(*) as qty FROM users WHERE email = ?",
    [email],
    (err, data) => {
      if (err) {
        return res.json({
          ok: false,
          message: "An Error occured, Please try again",
        });
      }

      if (data[0].qty > 0) {
        return res.json({ ok: false, message: "Email Already Exists" });
      } else {
        return res.json({ ok: true });
      }
    }
  );
};

module.exports = {
  emailExists,
};
