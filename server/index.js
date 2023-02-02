const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json())

const mail = require("./services/mail");

app.get("/", (req, res) => {
  res.json({ username: "yasin" });
});

app.post("/api/mail", mail);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
