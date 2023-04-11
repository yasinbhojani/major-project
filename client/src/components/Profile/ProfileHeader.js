import styles from "./ProfileHeader.module.css";
import Button from "../UI/Button/Button";
import verified from "../../assets/Profile/verified.svg";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const ProfileHeader = (props) => {
  let userObject = props.userObject;
  const redirect = useNavigate();
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }

  const updateProfileHandler = () => {
    redirect(`/profile/update/${userObject.user_id}`);
  };

  const followHandler = () => {};

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
            <Button text="Follow" onClick={followHandler} />
          )}
        </div>
      </div>
    </>
  );
};
export default ProfileHeader;
