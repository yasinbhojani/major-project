import styles from "./PrivateChats.module.css";

import jwt_decode from "jwt-decode";
import { io } from "socket.io-client";

import Button from "../UI/Button/Button";
import BackButton from "../UI/Button/BackButton";

import RenderChats from "./RenderChats";

import verified from "../../assets/Profile/verified.svg";
import more from "../../assets/Chats/more.svg";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const socket = io.connect(process.env.REACT_APP_API_ENDPOINT);

const PrivateChats = (props) => {
  console.log("Private Chat");
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

  // This UseEffect retrive Reciver Users Data and Old Users
  // For ex i am soham chating with yasin This UseEffect Will retrive data of yasin on my end and will retrive data of mine in yasin's end
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
        })
        .catch((err) => {
          alert("An error occured, please try again later: " + err.message);
        });
    };

    // This If checks If sender in params and logined user name is same or not so no one can access others Private chats by simpley typing Url in Url box
    // Also it checks for sender and reciver should not be same it can brake the app
    if (
      decodedToken.user_id !== chatDetails.senderID ||
      chatDetails.reciverID === chatDetails.senderID
    ) {
      // If someone trying to access others data from url they will be redirected to chats page
      redirect("/chats");
    } else {
      // If everything is legit then only retrive data
      reciver();
    }
  }, [
    decodedToken.user_id,
    chatDetails.senderID,
    chatDetails.reciverID,
    redirect,
  ]);

  // This Function will open recivers Profile
  const openUserHandler = (e) => {
    e.stopPropagation();
    redirect(`/profile/${reciversDetails.user_id}`);
  };

  // This Function establish new connetion to backend
  const newMessageSend = (e) => {
    e.preventDefault();
    // This Logic Removes / from the chats so that the database should not breake
    if (newMessage.trim() !== "") {
      if (newMessage.includes('"')) {
        let regex = /"/g;
        setNewMessage(newMessage.replace(regex, `\\"`));
      }

      // Emiting Messgae on soket with paylode
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
    // Here in data there is array of object with soket id and users id which are online
    // this for loope fillter the data to extract names of online users and then checks if this list contain recivers name or not
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

  // if both users (sender and reciver) are online the they will konw if other is typing new message or not
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
  // here we have to thisnk from both prespective like this backend is sendes message and recives too
  // so there are somen complex comparesons here which are nesseserry
  // for example soham and yasin cheting
  // Soham's View || Sender = soham ; reciver = yasin
  // Yasin's View || Sender = yasin ; reciver = soham
  // so that sender is reciver too and reciver is sender too
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

  // This functions is used when someone wants to delets all of his chats with perticular users
  const clearChatsHandler = (e) => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/chats/deleteChats/${chatDetails.senderID}/${chatDetails.reciverID}`,
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
        redirect("/chats");
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });
  };

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
                {reciversDetails.username}
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
          <div className={styles.more}>
            {isOnline && (
              <h1 className={styles.isOnline}>
                <span>Active</span>
              </h1>
            )}
            <div
              className={styles.dropdown}
              onClick={(e) => e.stopPropagation()}
            >
              <button>
                <img src={more} alt="" />
              </button>
              <div className={styles["dropdown-content"]}>
                <p onClick={clearChatsHandler}>Clear chat</p>
              </div>
            </div>
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
          placeholder="Type a message Here... "
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
