const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.json({ username: "yasin" });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
