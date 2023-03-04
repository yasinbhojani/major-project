const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server is Running" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/pearl", require("./routes/pearlRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
