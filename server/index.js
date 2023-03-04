const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const http = require("http");
const socket = require("./websocket/socket");
// const { Server } = require("socket.io");
const server = http.createServer(app);
socket(server);
const port = process.env.PORT || 8080;

const connection = require("./configs/db.config");

const mail = require("./services/mail");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server is Running" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/pearl", require("./routes/pearlRoutes"));
app.use("/api/chats", require("./routes/chatsRoutes"));

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
