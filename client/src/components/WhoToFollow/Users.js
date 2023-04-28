import Button from "../UI/Button/Button";
import styles from "./WhoToFollow.module.css";
import verification from "../../assets/Profile/verified.svg";
import { useEffect, useState } from "react";
const Users = (props) => {
  const [isFollowed, setIsFollowed] = useState(true);
  const { isFollowed: isUserFollowed } = props;

  useEffect(() => {
    setIsFollowed(isUserFollowed === 1 ? true : false);
  }, [isUserFollowed]);

  const ButtonStyles = isFollowed
    ? {
        border: "2px solid #7076FE",
        backgroundColor: "white",
        color: "black",
      }
    : null;

  const followHandler = (e) => {
    e.stopPropagation();

    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/profile/follow", {
      method: "post",
      body: JSON.stringify({
        following_id: props.userID,
        flag: isFollowed ? "unfollow" : "follow",
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.message);
        }

        setIsFollowed(!isFollowed);
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <>
      <div className={styles.user} onClick={props.onClick}>
        <div className={styles.userNameAndAvatar}>
          <img src={props.profilePicture} alt="" />
          <div>
            <h1>
              {props.userName}
              {props.userFollowers > 20 && (
                <img
                  src={verification}
                  alt=""
                  className={styles.verification}
                />
              )}
            </h1>
            <p>@{props.userID}</p>
          </div>
        </div>
        <Button
          style={ButtonStyles}
          text={isFollowed ? "Following" : "Follow"}
          onClick={followHandler}
        />
      </div>
    </>
  );
};
export default Users;
