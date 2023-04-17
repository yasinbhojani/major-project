import Button from "../UI/Button/Button";
import jwt_decode from "jwt-decode";
import styles from "./WhoToFollow.module.css";
import verification from "../../assets/Profile/verified.svg";
import { useNavigate } from "react-router-dom";
const Users = (props) => {
  const redirect = useNavigate();
  const suggestion = props.suggestion;
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  return (
    <>
      {suggestion.map((user) => {
        if (user.user_id !== decodedToken.user_id) {
          return (
            <div
              className={styles.user}
              key={user.user_id}
              onClick={() => redirect(`/profile/${user.user_id}`)}
            >
              <div className={styles.userNameAndAvatar}>
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
              </div>
              <Button text="Follow" />
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};
export default Users;
