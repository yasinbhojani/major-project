import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import styles from "./PrivateChats.module.css";
import Button from "../UI/Button/Button";
import BackButton from "../UI/Button/BackButton";
import RenderChats from "./RenderChats";
import verified from "../../assets/Profile/verified.svg";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8080");
const PrivateChats = (props) => {
  const redirect = useNavigate();
  const chatDetails = useParams();
  const [reciversDetails, setReciversDetails] = useState();
  const [newMessage, setNewMessage] = useState("");
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  // This UseEffect retrive Searched Users Data and Old Users
  useEffect(() => {
    const reciver = () => {
      fetch(
        `http://localhost:8080/api/profile/searchProfile/${chatDetails.reciverID.trim()}`,
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
  // This Functions Stores Value of new Chat in state
  const newMessageChangeHandler = (e) => {
    setNewMessage(e.target.value);
  };
  // This Function establish new connetion to backend
  const newMessageSend = (e) => {
    e.preventDefault();
    socket.emit("NewMessage", {
      sender: chatDetails.senderID,
      reciver: chatDetails.reciverID,
      message: newMessage,
    });
    setNewMessage("");
  };
  // HTML HERE
  return (
    <div className={styles.chats}>
      {reciversDetails !== undefined && (
        <div className={styles.reciversDetails} onClick={openUserHandler}>
          <BackButton className={styles.BackButton} />
          <img src={reciversDetails.avatar_url} alt="" />
          <div>
            <h5>
              {reciversDetails.username}{" "}
              {reciversDetails.followers > 10 && (
                <img src={verified} alt="" className={styles.verified} />
              )}
            </h5>
            <p>@{reciversDetails.user_id}</p>
          </div>
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
          required
        />
        <Button text="Send" />
      </form>
    </div>
  );
};
export default PrivateChats;
