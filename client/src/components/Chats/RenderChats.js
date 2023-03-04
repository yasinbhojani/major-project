import { useEffect, useRef, useState } from "react";
import styles from "./RenderChats.module.css";
import { io } from "socket.io-client";
import jwt_decode from "jwt-decode";
// import NotificationSound from "../../assets/Chats/Notification.mp3";
const socket = io.connect("http://localhost:8080");
const RenderChats = (props) => {
  const [chats, setChats] = useState([]);
  const messageEndRef = useRef(null);
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  useEffect(() => {
    const retriveData = () => {
      fetch(
        `http://localhost:8080/api/chats/${props.sender}/${props.reciver}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((data) => {
          return data.json();
        })
        .then((details) => {
          if (details.length !== 0) {
            setChats(details);
          }
        });
    };
    retriveData();
  }, [props.sender, props.reciver]);
  // Recivig New Message from Backend
  socket.on("ReceiveMessage", (data) => {
    setChats([...chats, data]);
    if (data.sender !== decodedToken.user_id) {
      // const audio = new Audio(NotificationSound);
      // audio.play();
      console.log("Notification");
    }
  });
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  });
  return (
    <div className={styles.chats}>
      {chats.length !== 0 &&
        chats.map((message) => {
          return (
            <div
              key={message.sent_date || Math.random()}
              className={
                decodedToken.user_id === message.sender_id ||
                decodedToken.user_id === message.sender
                  ? styles.senderChat
                  : styles.reciverChat
              }
            >
              <div>
                <p className={styles.mess}> {message.message}</p>
                <p className={styles.time}>
                  {new Date(message.sent_date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) !== "Invalid Date"
                    ? new Date(message.sent_date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </p>
              </div>
            </div>
          );
        })}
      <div ref={messageEndRef} />
    </div>
  );
};
export default RenderChats;
