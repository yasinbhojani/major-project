const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   database: process.env.MYSQL_DB_NAME,
//   password: process.env.MYSQL_PASS,
//   port: process.env.MYSQL_PORT,
// });

const connection = mysql.createConnection(process.env.DEV_DATABASE_URL);

module.exports = connection;
