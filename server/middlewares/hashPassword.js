const bcrypt = require("bcryptjs");

// Hashing the password (Do not store the passwords directly)
const hashPassword = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.json({ ok: false, message: "an error occured" });

    req.password_hash = hash;
    next();
  });
};

const hashPasswordByArgs = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject("error");

      resolve(hash);
    });
  });
};

module.exports = {
  hashPassword,
  hashPasswordByArgs,
};
