import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ProfileHeader.module.css";
import Button from "../UI/Button/Button";
import verified from "../../assets/Profile/verified.svg";
import jwt_decode from "jwt-decode";

const ProfileHeader = (props) => {
  let userObject = props.userObject;
  const { is_following: isFollowed, user_id } = userObject;
  const redirect = useNavigate();

  const [isFollowing, setIsFollowing] = useState(true);

  useEffect(() => {
    console.log(isFollowed + ` ${userObject.username}`);
    if (isFollowed === 0) {
      setIsFollowing(false);
    } else if (isFollowed === 1) {
      setIsFollowing(true);
    }
  }, [isFollowed, user_id]);

  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }

  const updateProfileHandler = () => {
    redirect(`/profile/update/${userObject.user_id}`);
  };

  const followHandler = () => {
    // follow code goes here
    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/profile/follow", {
      method: "post",
      body: JSON.stringify({
        following_id: userObject.user_id,
        flag: isFollowing ? "unfollow" : "follow",
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

        setIsFollowing(!isFollowing);
      })
      .catch((err) => console.error(err.message));
  };

  const ButtonStyles = isFollowing
    ? {
        border: "2px solid #7076FE",
        backgroundColor: "white",
        color: "black",
      }
    : null;

  return (
    <>
      <div className={styles.profileDetailsNameAndEdit}>
        <div className={styles.avatar_url}>
          <a href={userObject.avatar_url} target="_blank" rel="noreferrer">
            {userObject.avatar_url === "" ? (
              <div className={styles.spinner}></div>
            ) : (
              <img src={userObject.avatar_url} alt="" />
            )}
          </a>
        </div>
        <div className={styles.userNameDetails}>
          <div className={styles.userNameAndVerified}>
            <h1>{userObject.username}</h1>
            {userObject.followers > 10 && (
              <img src={verified} alt="" width="27px" />
            )}
          </div>
          <div>
            <p>@{userObject.user_id}</p>
          </div>
        </div>
        <div>
          {props.user_id === decodedToken.user_id ? (
            <button
              className={styles.profileEditButton}
              onClick={updateProfileHandler}
            >
              Edit Profile
            </button>
          ) : (
            <Button
              style={ButtonStyles}
              text={isFollowing ? "Following" : "Follow"}
              onClick={followHandler}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default ProfileHeader;
