const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ ok: false, message: "Token is invalid" });
      }

      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ ok: false, message: "You are not authenticated" });
  }
};

module.exports = verify;
