const socketIO = require("socket.io");
const connection = require("../configs/db.config");
let isSocketConnected = false;

const socket = (server) => {
  // socket.io code goes here

  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  //   Chats Real-Time Connetions
  const onlineUsers = {};
  io.on("connection", (socket) => {
    console.log("(WebSocket) Connetion Established");
    socket.on("NewMessage", (data) => {
      connection.query(
        `INSERT INTO chats values ("${data.sender}","${data.reciver}","${data.message}",now())`
      );
      socket.broadcast.emit("ReceiveMessage", data);
    });
    socket.on("Typing", (data) => {
      socket.broadcast.emit("Typing", data);
    });
    socket.on("TypingStoped", (data) => {
      socket.broadcast.emit("TypingStoped", data);
    });
    socket.on("online", (data) => {
      onlineUsers[socket.id] = data.userId;
      socket.broadcast.emit("onlineUsers", onlineUsers);
    });
    socket.on("disconnect", () => {
      delete onlineUsers[socket.id];
      socket.broadcast.emit("onlineUsers", onlineUsers);
    });
  });
  return io;
};

module.exports = socket;
