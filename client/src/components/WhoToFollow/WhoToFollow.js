import { useEffect, useState } from "react";
import styles from "./WhoToFollow.module.css";
import Button from "../UI/Button/Button";
import verification from "../../assets/Profile/verified.svg";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const WhoToFollow = () => {
  const redirect = useNavigate();
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
          setSuggestion(details);
        }
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
        {suggestion.map((user) => {
          if (user.user_id !== decodedToken.user_id) {
            return (
              <div
                className={styles.user}
                key={user.user_id}
                onClick={() => redirect(`/profile/${user.user_id}`)}
              >
                <img src={user.avatar_url} alt="" />
                <div>
                  <h1>
                    {user.username}
                    {user.followers > 20 && (
                      <img
                        src={verification}
                        alt=""
                        className={styles.verification}
                      />
                    )}
                  </h1>
                  <p>@{user.user_id}</p>
                </div>
                <Button text="Follow" />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className={records === 2 ? styles.twoRecords : styles.threeRecords}>
        <div className={styles.footer}>
          <p onClick={() => redirect("/about")}>About</p>
          <p>
            <a
              href="https://github.com/yasinbhojani/major-project"
              target="_blank"
              rel="noreferrer"
            >
              Contribute
            </a>
          </p>
          <p onClick={() => redirect("/career")}>Career</p>
        </div>
        <p>
          © 2023 Team <span>Shell</span>
        </p>
      </div>
    </>
  );
};
export default WhoToFollow;
