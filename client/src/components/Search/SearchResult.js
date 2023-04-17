import styles from "./SearchResult.module.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import verified from "../../assets/Profile/verified.svg";

const SearchResult = (props) => {
  const profiles = props.profiles;
  const redirect = useNavigate();
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  return (
    profiles.length > 0 && (
      <div className={styles.result}>
        {profiles[0] === "no users" ? (
          <div className={styles.noUserFound}>
            <h3>No Records {": ("}</h3>
          </div>
        ) : (
          profiles.map((user) => {
            if (user.user_id !== decodedToken.user_id) {
              return (
                <div
                  className={styles.searchResult}
                  onClick={() => redirect(`/profile/${user.user_id}`)}
                  key={user.user_id}
                >
                  <img src={user.avatar_url} alt="" />
                  <div className={styles.nameAndUserName}>
                    <h3>
                      {user.username}
                      {user.followers > 10 && <img src={verified} alt="" />}
                    </h3>
                    <p>@{user.user_id}</p>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })
        )}
      </div>
    )
  );
};
export default SearchResult;
