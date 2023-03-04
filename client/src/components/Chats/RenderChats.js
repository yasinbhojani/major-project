import { useEffect, useRef, useState } from "react";
import styles from "./RenderChats.module.css";
import { io } from "socket.io-client";
import jwt_decode from "jwt-decode";
import NotificationSound from "../../assets/Chats/Notification.mp3";
const socket = io.connect("http://localhost:8080");
const RenderChats = (props) => {
  const [chats, setChats] = useState([]);
  const messageEndRef = useRef(null);
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  // Use Effects Which Retrives Old Chats from DB
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
  socket.off("ReceiveMessage").on("ReceiveMessage", (data) => {
    setChats([...chats, data]);
    // Playing Notification Sound
    if (data.sender !== decodedToken.user_id) {
      const audio = new Audio(NotificationSound);
      audio.play();
    }
  });
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  });
  return (
    <div className={styles.chats}>
      {chats.length !== 0 &&
        chats.map((message) => {
          // Repetative Link Validations
          let Link = message.message.substring(
            message.message.indexOf("https://"),
            message.message.includes(" ", message.message.indexOf("https://"))
              ? message.message.indexOf(" ", "https://")
              : message.message.length
          );
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
                {/* This First P is all About Links I mean for Links Validations */}
                <>
                  {message.message.includes("https://") ? (
                    <p className={styles.mess}>
                      <>
                        {message.message.substring(
                          0,
                          message.message.indexOf("https://")
                        )}
                      </>
                      <a href={Link} target="_blank" rel="noreferrer">
                        {Link}
                      </a>
                      <>
                        {message.message.substring(
                          message.message.includes(
                            " ",
                            message.message.indexOf("https://")
                          )
                            ? message.message.indexOf(" ", "https://")
                            : message.message.length,
                          message.message.length
                        )}
                      </>
                    </p>
                  ) : (
                    // This Is For Those Message which dsent have any links
                    <p className={styles.mess}>{message.message}</p>
                  )}
                </>
                {/* This Div Is For Data Output */}
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
      {/* Scroll Div */}
      <div ref={messageEndRef} />
    </div>
  );
};
export default RenderChats;
