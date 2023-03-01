const express = require("express");
const router = express.Router();
const verify = require("../middlewares/verifyToken");

router.get("/", [verify], (req, res) => {
  
});

module.exports = router;
