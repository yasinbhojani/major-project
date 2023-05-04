const express = require("express");
const router = express.Router();
const connection = require("../configs/db.config");

router.get("/tags", (req, res) => {
  connection.query(
    `SELECT trending_tag, COUNT(*) AS count FROM trendings GROUP BY trending_tag ORDER BY count DESC LIMIT 3;
      `,
    (err, data) => {
      res.send(data);
    }
  );
});

module.exports = router;
