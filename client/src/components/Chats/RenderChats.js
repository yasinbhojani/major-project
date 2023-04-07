import styles from "./RenderChats.module.css";
import { io } from "socket.io-client";

import jwt_decode from "jwt-decode";

import NotificationSound from "../../assets/Chats/Notification.mp3";

import { useEffect, useRef, useState } from "react";

const socket = io.connect(process.env.REACT_APP_API_ENDPOINT);

const RenderChats = (props) => {
  console.log("Render Chat");
  const [chats, setChats] = useState([]);
  const messageEndRef = useRef(null);

  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }

  // This UseEffect Will Retrive Old Chats from SQl DataBase
  useEffect(() => {
    const retriveData = () => {
      fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/api/chats/${props.sender}/${props.reciver}`,
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
        })
        .catch((err) => {
          alert("An error occured, please try again later: " + err.message);
        });
    };
    retriveData();
  }, [props.sender, props.reciver]);

  // Recivig New Message from Backend
  // If socket gets ping(ReciveMessage) it checks and validate all the data and then only renders
  // so that no one can recives others chat through sockets
  socket.off("ReceiveMessage").on("ReceiveMessage", (data) => {
    if (data.sender === decodedToken.user_id) {
      setChats([...chats, data]);
    } else {
      if (
        data.reciver === decodedToken.user_id &&
        data.sender === props.reciver
      ) {
        setChats([...chats, data]);
        // Playing Notification Sound
        if (data.sender !== decodedToken.user_id) {
          const audio = new Audio(NotificationSound);
          audio.play();
        }
      }
    }
  });

  // Once Old chats loaded this useEffect Will Scroll down to the last chats
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  });

  // HTML here
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
                      {Link.indexOf("https://www.youtube.com/watch?v=") !==
                        -1 && (
                        <a href={Link} target="_blank" rel="noreferrer">
                          <img
                            src={`https://img.youtube.com/vi/${Link.split(
                              "v="
                            )[1].substring(0, 11)}/maxresdefault.jpg`}
                            alt=""
                            className={styles.ytImg}
                          />
                        </a>
                      )}
                      {Link.indexOf("https://youtu.be/") !== -1 && (
                        <a href={Link} target="_blank" rel="noreferrer">
                          <img
                            src={`https://img.youtube.com/vi/${Link.split(
                              "be/"
                            )[1].substring(0, 11)}/maxresdefault.jpg`}
                            alt=""
                            className={styles.ytImg}
                          />
                        </a>
                      )}
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
      {chats.length === 0 && (
        <p className={styles.noChats}>
          No message are available. Once you send message they will appear here.
        </p>
      )}
    </div>
  );
};
export default RenderChats;
