import { useEffect, useRef, useState } from "react";
import styles from "./Chats.module.css";
import jwt_decode from "jwt-decode";
import verified from "../../assets/Profile/verified.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import noconversation from "../../assets/Chats/conversation.svg";
import { io } from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_API_ENDPOINT);
const Chats = (props) => {
  const redirect = useNavigate();
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  const [result, setResult] = useState();
  const [conversation, setConversation] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");
  const setTimeoutRef = useRef(null);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const searchUsers = () => {
    if (searchedUser.trim() === "") {
      setResult([]);
      return;
    }

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
      });
  };

  const searchUserOnChangeHandler = (e) => {
    setSearchedUser(e.target.value);
  };

  useEffect(() => {
    document.title = "Chats / Shell"
  }, [])

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
            });
        }
        setConversation(arrayOfUsers);
      });

    // Checking Is Other Users Online
    socket.off("onlineUsers").on("onlineUsers", (data) => {
      for (let propName in data) {
        if (data.hasOwnProperty(propName)) {
          setOnlineUsers([...onlineUsers, data[propName]]);
        } else {
          let index = onlineUsers.indexOf(data[propName]);
          setOnlineUsers(onlineUsers.splice(index, index));
        }
      }
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
  return (
    <div className={styles.Search}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search Users"
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
              <img src={user.avatar_url} alt="" />
              <div className={styles.nameAndLastMessage}>
                <p>
                  <b>{user.username}</b>
                  {user.followers > 10 && (
                    <img src={verified} alt="" className={styles.verified} />
                  )}
                </p>
                <p>{user.message}</p>
              </div>
              {/* Checking Is Online or Not */}
              {onlineUsers.includes(user.user_id) && (
                <h1 className={styles.isOnline}>
                  <span>Online</span>
                </h1>
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
          <h2>New Conversation</h2>
        </div>
      )}
    </div>
  );
};
export default Chats;
