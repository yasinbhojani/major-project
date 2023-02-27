import Button from "../UI/Button/Button";
import styles from "./SearchResult.module.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import verified from "../../assets/Profile/verified.svg"


const SearchResult = (props) => {
  const profiles = props.profiles;
  const redirect = useNavigate();
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  const followUser = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {profiles[0] === "no users" ? (
        <div className={styles.noUserFound}>
          <h3>Sorry, We Didn't Found Any Users {": ("}</h3>
        </div>
      ) : (
        profiles.map((user) => {
          return (
            <div
              className={styles.searchResult}
              onClick={() => redirect(`/profile/${user.user_id}`)}
              key={user.user_id}
            >
              <div className={styles.nameAvatar}>
                <img src={user.avatar_url} alt="" />
                <div className={styles.nameAndUserName}>
                  <h3>
                    {user.username}
                    {user.followers > 10 && (
                      <img src={verified} alt="" />
                    )}
                  </h3>
                  <p>@{user.user_id}</p>
                </div>
              </div>
              {user.user_id === decodedToken.user_id ? (
                <Button
                  text="Edit Profile"
                  onClick={() => redirect(`/profile/update/${user.user_id}`)}
                  className={styles.myProfile}
                />
              ) : (
                <Button text="Follow" onClick={followUser} />
              )}
            </div>
          );
        })
      )}
    </>
  );
};
export default SearchResult;
