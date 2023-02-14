const bcrypt = require("bcryptjs");

// Hashing the password (Do not store the passwords directly)
const hashPassword = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) res.json({ ok: false, message: "an error occured" });

    req.password_hash = hash;
    next();
  });
};

module.exports = {
  hashPassword,
};
