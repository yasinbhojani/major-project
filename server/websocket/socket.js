const socketIO = require("socket.io");
const connection = require("../configs/db.config");
let isSocketConnected = false;

const { v4 } = require("uuid");
//   Chats Real-Time Connetions
const onlineUsers = {};

const socket = (server) => {
  // socket.io code goes here

  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("(WebSocket) Connetion Established");
    socket.on("NewMessage", (data) => {
      if (data.message.includes('"')) {
        let regex = /"/g;
        data.message = data.message.replace(regex, `\\"`);
      }
      connection.query(
        `INSERT INTO chats values ("${v4().substring(0, 5)}","${
          data.sender
        }","${data.reciver}","${data.message}",now())`
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
      if (data.userId !== "") {
        onlineUsers[socket.id] = data.userId;
      }
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
