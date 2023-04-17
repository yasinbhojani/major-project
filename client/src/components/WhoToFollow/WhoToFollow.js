import { useEffect, useState } from "react";
import styles from "./WhoToFollow.module.css";
import jwt_decode from "jwt-decode";
import Users from "./Users";
import Footer from "./Footer";
const WhoToFollow = () => {
  const [suggestion, setSuggestion] = useState([]);
  const [records, setRecords] = useState(3);
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/profile/whotofollow`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        for (let user in details) {
          if (details[user].user_id === decodedToken.user_id) {
            setRecords(2);
            break;
          }
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
        <Users suggestion={suggestion} />
      </div>
      <Footer records={records} />
    </>
  );
};
export default WhoToFollow;
