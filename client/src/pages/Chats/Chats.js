import styles from "./Chats.module.css";
import { io } from "socket.io-client";

import jwt_decode from "jwt-decode";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import verified from "../../assets/Profile/verified.svg";
import noconversation from "../../assets/Chats/conversation.svg";

import Button from "../../components/UI/Button/Button";

const socket = io.connect(process.env.REACT_APP_API_ENDPOINT);

const Chats = (props) => {
  console.log("Chats");
  const redirect = useNavigate();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [status, setStatus] = useState([]);
  const [newMessages, setNewMessages] = useState([]);

  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }

  const [result, setResult] = useState();
  const [conversation, setConversation] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");
  const setTimeoutRef = useRef(null);

  // If someone search for users to chat with this functions will retuen search result
  const searchUsers = () => {
    // Validation to check empty imput
    if (searchedUser.trim() === "") {
      setResult([]);
      return;
    }
    // retriving searched data
    fetch(
      `${
        process.env.REACT_APP_API_ENDPOINT
      }/api/profile/searchProfile/${searchedUser.trim()}`,
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
          setResult(details.profiles);
        } else {
          setResult(details.profiles);
        }
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });
  };

  const searchUserOnChangeHandler = (e) => {
    setSearchedUser(e.target.value);
  };

  useEffect(() => {
    document.title = "Chats / Shell";
  }, []);

  // This UseEffect will retrive old conversetions from database
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/chats/conversation/${decodedToken.user_id}`,
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
        let arrayOfUsers = [];
        for (let users in details) {
          fetch(
            `${process.env.REACT_APP_API_ENDPOINT}/api/profile/openProfile/${details[users].user}`,
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
            .then((userDetails) => {
              arrayOfUsers.push({ ...userDetails, ...details[users] });
            })
            .catch((err) => {
              alert("An error occured, please try again later: " + err.message);
            });
        }
        setConversation(arrayOfUsers);
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });

    setTimeoutRef.current = setTimeout(() => {
      searchUsers();
    }, 500);
    return () => {
      clearTimeout(setTimeoutRef.current);
    };
    // eslint-disable-next-line
  }, [searchedUser]);

  // // I am Online
  socket.emit("online", { userId: decodedToken.user_id });

  // Checking Is Other Users Online
  socket.off("onlineUsers").on("onlineUsers", (data) => {
    // Here in data there is array of object with soket id and users id which are online
    // this for loope fillter the data to extract names of online users and then checks if this list contain recivers name or not
    for (let propName in data) {
      if (data.hasOwnProperty(propName)) {
        if (!onlineUsers.includes(data[propName])) {
          setOnlineUsers([...onlineUsers, data[propName]]);
        }
      }
    }
  });

  // Checking if User Typing
  socket.off("Typing").on("Typing", (data) => {
    if (data.reciver === decodedToken.user_id) {
      if (!status.includes(data.sender)) {
        setStatus([...status, data.sender]);
      }
    }
  });

  // Checking if User stoped Typing
  socket.off("TypingStoped").on("TypingStoped", (data) => {
    if (data.reciver === decodedToken.user_id) {
      if (status.includes(data.sender)) {
        let index = status.indexOf(data.sender);
        let array = status.splice(index, index);
        setStatus(array);
      }
    }
  });

  // Onces Recive New Message Firstly Typing Will be removed then a new promt will occer near Active saying new message
  socket.off("latestMessage").on("latestMessage", (data) => {
    if (data.reciver === decodedToken.user_id) {
      if (status.includes(data.sender)) {
        let index = status.indexOf(data.sender);
        let array = status.splice(index, index);
        setStatus(array);
        if (!newMessages.includes(data.sender)) {
          setNewMessages([...newMessages, data.sender]);
        }
      }
    }
  });

  // HTML here
  return (
    <div className={styles.Search}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Select an users to start chat"
          onChange={searchUserOnChangeHandler}
          required
        />
        <Button text="Search" className={styles.searchBtn} type="submit" />
      </form>
      {!result && conversation.length === 0 && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      )}
      {result &&
        result.length === 0 &&
        conversation.length !== 0 &&
        conversation.map((user) => {
          return (
            <div
              key={user.user_id}
              className={styles.searchUsers}
              onClick={() => {
                redirect(
                  `/chats/private/${decodedToken.user_id}/${user.user_id}`
                );
              }}
            >
              <img
                src={user.avatar_url}
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                  redirect(`/profile/${user.user_id}`);
                }}
              />
              <div className={styles.nameAndLastMessage}>
                <p>
                  <b>{user.username}</b>
                  {user.followers > 10 && (
                    <img src={verified} alt="" className={styles.verified} />
                  )}
                </p>
                {status.includes(user.user_id) ? (
                  <p className={styles.currentStatus}>Typing...</p>
                ) : newMessages.includes(user.user_id) ? (
                  <p className={styles.currentStatus}>New Message</p>
                ) : (
                  <p className={styles.mess}>{user.message}</p>
                )}
              </div>
              {onlineUsers.includes(user.user_id) && (
                <div className={styles.isOnline}>Active</div>
              )}
            </div>
          );
        })}
      {result && result[0] === "no users" && (
        <div className={styles.noUserFound} key="noUsers">
          <h3>Sorry, We Didn't Found Any Users {": ("}</h3>
        </div>
      )}
      {result && result[0] !== "no users" && (
        <div>
          {result.map((user) => {
            if (user.user_id === decodedToken.user_id) {
              return <p key="currentUsers" style={{ display: "none" }}></p>;
            }
            return (
              <div
                key={user.user_id}
                className={styles.searchUsers}
                onClick={() => {
                  redirect(
                    `/chats/private/${decodedToken.user_id}/${user.user_id}`
                  );
                }}
              >
                <img src={user.avatar_url} alt="" />
                <h6>{user.username}</h6>
                {user.followers > 10 && (
                  <img src={verified} alt="" className={styles.verified} />
                )}
              </div>
            );
          })}
        </div>
      )}
      {result && conversation.length === 0 && (
        <div className={styles.noConversation}>
          <img src={noconversation} alt="" />
          <div>
            <h3>Conversation Not Available</h3>
            <p>
              There are no conversation available at the moment.
              <br />
              Send new messages to friends.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Chats;
