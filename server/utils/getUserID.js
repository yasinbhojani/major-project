const connection = require("../configs/db.config");
const getUserID = (post_id) => {
  return connection
    .promise()
    .query(`select author_id from posts where post_id="${post_id}"`);
};

module.exports = getUserID;
