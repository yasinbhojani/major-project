import { useEffect, useState } from "react";
import styles from "./WhoToFollow.module.css";
import jwt_decode from "jwt-decode";
import Users from "./Users";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
const WhoToFollow = () => {
  const [suggestion, setSuggestion] = useState([]);
  const [records, setRecords] = useState(3);
  const redirect = useNavigate();
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/profile/whotofollow/${decodedToken.user_id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        for (let user in details) {
          if (details[user].user_id === decodedToken.user_id) {
            if (details.length === 2) {
              setRecords(1);
            } else {
              setRecords(2);
            }
            break;
          }
        }
        if (details.length === 1) {
          setRecords(1);
        }
        setSuggestion(details);
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });
  }, [decodedToken.user_id]);
  return (
    <>
      <div className={styles.WhoToFollow}>
        <h1 className={styles.header}>
          {Math.random() >= 0.5 ? "Suggested for you" : "Who to follow "}
        </h1>
        {suggestion.length === 1 &&
        suggestion[0].user_id === decodedToken.user_id ? (
          <p className={styles.noSuggestion}>No suggestion for you</p>
        ) : (
          suggestion.map((user) => {
            if (decodedToken.user_id !== user.user_id) {
              return (
                <Users
                  key={user.user_id}
                  onClick={() => redirect(`/profile/${user.user_id}`)}
                  profilePicture={user.avatar_url}
                  userName={user.username}
                  userID={user.user_id}
                  userFollowers={user.followers}
                />
              );
            } else {
              return null;
            }
          })
        )}
      </div>
      <Footer records={records} />
    </>
  );
};
export default WhoToFollow;
