const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const port = process.env.PORT || 8080;

const connection = require("./configs/db.config");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

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

// Chate Functionality
io.on("connection", (socket) => {
  console.log("Real-Time Connetion Established");
  socket.on("NewMessage", (data) => {
    connection.query(
      `INSERT INTO chats values ("${data.sender}","${data.reciver}","${data.message}",now())`
    );
    socket.broadcast.emit("ReceiveMessage", data);
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
