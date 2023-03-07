import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import styles from "./PrivateChats.module.css";
import Button from "../UI/Button/Button";
import BackButton from "../UI/Button/BackButton";
import RenderChats from "./RenderChats";
import verified from "../../assets/Profile/verified.svg";
import { io } from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_API_ENDPOINT);
const PrivateChats = (props) => {
  const redirect = useNavigate();
  const chatDetails = useParams();
  const [reciversDetails, setReciversDetails] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }

  // This UseEffect retrive Searched Users Data and Old Users
  useEffect(() => {
    const reciver = () => {
      fetch(
        `${
          process.env.REACT_APP_API_ENDPOINT
        }/api/profile/searchProfile/${chatDetails.reciverID.trim()}`,
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
          if (details.ok) {
            setReciversDetails(details.profiles[0]);
          }
        });
    };
    if (
      decodedToken.user_id !== chatDetails.senderID ||
      chatDetails.reciverID === chatDetails.senderID
    ) {
      redirect("/");
    } else {
      reciver();
    }
  }, [
    decodedToken.user_id,
    chatDetails.senderID,
    chatDetails.reciverID,
    redirect,
  ]);

  // This Function is For to open Users Chats
  const openUserHandler = (e) => {
    e.stopPropagation();
    redirect(`/profile/${reciversDetails.user_id}`);
  };

  // This Function establish new connetion to backend
  const newMessageSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      if (newMessage.includes('"')) {
        let regex = /"/g;
        setNewMessage(newMessage.replace(regex, `\\"`));
      }

      socket.emit("NewMessage", {
        sender: chatDetails.senderID,
        reciver: chatDetails.reciverID,
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  // // I am Online
  socket.emit("online", { userId: decodedToken.user_id });
  // Checking Is Other Users Online
  socket.off("onlineUsers").on("onlineUsers", (data) => {
    for (let propName in data) {
      if (data.hasOwnProperty(propName)) {
        if (data[propName] === chatDetails.reciverID) {
          setIsOnline(true);
          break;
        } else {
          setIsOnline(false);
        }
      }
    }
  });
  // This Functions Stores Value of new Chat in state
  const newMessageChangeHandler = (e) => {
    setNewMessage(e.target.value);
    if (e.target.value !== "") {
      socket.emit("Typing", {
        sender: chatDetails.senderID,
        reciver: chatDetails.reciverID,
      });
    } else {
      socket.emit("TypingStoped", {
        sender: chatDetails.senderID,
        reciver: chatDetails.reciverID,
      });
    }
  };

  // Checking is Sender is Typing Message or not
  socket.off("Typing").on("Typing", (data) => {
    if (data.sender !== decodedToken.user_id) {
      if (data.sender === chatDetails.reciverID) {
        if (data.reciver === decodedToken.user_id) {
          setStatus("Typing...");
        }
      }
    }
  });

  // Checking if User stoped Typing
  socket.off("TypingStoped").on("TypingStoped", (data) => {
    if (data.sender !== decodedToken.user_id) {
      if (data.sender === chatDetails.reciverID) {
        if (data.reciver === decodedToken.user_id) {
          setStatus("");
        }
      }
    }
  });

  socket.off("ReceiveMessage").on("ReceiveMessage", () => {
    setStatus(""); //Clering The Typing Text
  });

  // HTML HERE
  return (
    <div className={styles.chats}>
      {reciversDetails !== undefined && (
        <div className={styles.headerDiv} onClick={openUserHandler}>
          <div className={styles.reciversDetails}>
            <BackButton className={styles.BackButton} />
            <img src={reciversDetails.avatar_url} alt="" />
            <div>
              <h5>
                {reciversDetails.username}{" "}
                {reciversDetails.followers > 10 && (
                  <img src={verified} alt="" className={styles.verified} />
                )}
              </h5>
              {status === "" ? (
                <p>@{reciversDetails.user_id}</p>
              ) : (
                <p> {status}</p>
              )}
            </div>
          </div>
          {isOnline && (
            <h1 className={styles.isOnline}>
              <span>Online</span>
            </h1>
          )}
        </div>
      )}
      <RenderChats
        sender={chatDetails.senderID}
        reciver={chatDetails.reciverID}
      />
      <form onSubmit={newMessageSend}>
        <input
          type="text"
          placeholder="New Message"
          onChange={newMessageChangeHandler}
          value={newMessage}
          maxLength="200"
          required
        />
        <Button text="Send" />
      </form>
    </div>
  );
};
export default PrivateChats;
