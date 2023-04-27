import Button from "../UI/Button/Button";
import styles from "./WhoToFollow.module.css";
import verification from "../../assets/Profile/verified.svg";
const Users = (props) => {
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
        <Button text="Follow" />
      </div>
    </>
  );
};
export default Users;
