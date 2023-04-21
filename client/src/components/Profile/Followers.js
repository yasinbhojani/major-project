import styles from "./Following.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import verified from "../../assets/Profile/verified.svg";
const Followers = (props) => {
  const { user_id } = useParams();
  const [data, setData] = useState([]);
  const redirect = useNavigate();
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/followFollowing/followers/${user_id}`,
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
        setData(details);
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });
  }, [user_id]);
  return (
    <div className={styles.following}>
      {data.map((user) => {
        return (
          <div
            key={user.username}
            className={styles.users}
            onClick={() => {
              props.close();
              redirect(`/profile/${user.user_id}`);
            }}
          >
            <img src={user.avatar_url} alt="" className={styles.avatar} />
            <div className={styles.userInfo}>
              <p className={styles.username}>
                {user.username}
                {user.followers > 20 && (
                  <img src={verified} alt="" className={styles.verified} />
                )}
              </p>
              <p className={styles.user_id}>@{user.user_id}</p>
            </div>
          </div>
        );
      })}
      {data.length === 0 && <p>No Followers</p>}
    </div>
  );
};
export default Followers;
