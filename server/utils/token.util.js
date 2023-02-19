const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { user_id: user.user_id, is_admin: user.is_admin },
    process.env.TOKEN_SECRET
  );
};

module.exports = {
  generateAccessToken,
};
