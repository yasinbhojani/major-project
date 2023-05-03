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
      let chat_id = v4().substring(0, 5);
      connection.query(
        `INSERT INTO chats values ("${chat_id}","${data.sender}","${data.reciver}","${data.message}",now())`
      );
      connection.query(
        `SELECT * FROM conversation WHERE user1="${data.sender}" AND user2="${data.reciver}" OR user1="${data.reciver}" AND user2="${data.sender}";`,
        (err, result) => {
          if (result.length === 0) {
            let conversation_id = v4().substring(0, 5);
            let notification_id = v4().substring(0, 5);
            connection.query(
              `INSERT INTO conversation values ("${conversation_id}","${data.sender}","${data.reciver}","${data.message}",now());`,
              (error, resultdata) => {
                console.log(
                  "(server) first message notification sent to @" + data.reciver
                );
                connection.query(
                  `
                  INSERT INTO notifications values ("${notification_id}","${data.sender}","${data.reciver}","Messaged You For The First Time",now(),"first_time")`
                );
              }
            );
          } else {
            connection.query(
              ` UPDATE conversation SET last_message="${data.message}"  WHERE user1="${data.sender}" AND user2="${data.reciver}" OR user1="${data.reciver}" AND user2="${data.sender}";`
            );
          }
        }
      );
      socket.broadcast.emit("ReceiveMessage", data);
      socket.broadcast.emit("latestMessage", data);
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
