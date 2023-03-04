import { useEffect, useRef, useState } from "react";
import styles from "./Chats.module.css";
import jwt_decode from "jwt-decode";
import verified from "../../assets/Profile/verified.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
const Chats = (props) => {
  const redirect = useNavigate();
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  const [result, setResult] = useState();
  const [searchedUser, setSearchedUser] = useState("");
  const setTimeoutRef = useRef(null);

  const searchUsers = () => {
    if (searchedUser.trim() === "") {
      setResult([]);
      return;
    }

    fetch(
      `http://localhost:8080/api/profile/searchProfile/${searchedUser.trim()}`,
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
    setTimeoutRef.current = setTimeout(() => {
      searchUsers();
    }, 500);
    return () => {
      clearTimeout(setTimeoutRef.current);
    };
    // eslint-disable-next-line
  }, [searchedUser]);
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
    </div>
  );
};
export default Chats;
