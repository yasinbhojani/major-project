const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8080;
const app = express();

const http = require("http");
const socket = require("./websocket/socket");
const server = http.createServer(app);
socket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server is Running" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/pearl", require("./routes/pearlRoutes"));
app.use("/api/chats", require("./routes/chatsRoutes"));
app.use("/api/notification", require("./routes/notificationRoutes"));

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
