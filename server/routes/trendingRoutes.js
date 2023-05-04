const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");
const verify = require("../middlewares/verifyToken");

router.get("/tags", [verify], (req, res) => {
  connection.query(
    `SELECT tags, COUNT(*) AS count FROM trending_tag GROUP BY tags ORDER BY count DESC LIMIT 3;
      `,
    (err, data) => {
      res.send(data);
    }
  );
});

module.exports = router;
