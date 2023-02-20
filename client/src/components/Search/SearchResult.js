import Button from "../UI/Button/Button";
import styles from "./SearchResult.module.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const SearchResult = (props) => {
  const profile = props.profile;
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  const redirect = useNavigate();
  const OpenProfileHandler = () => {
    redirect(`/profile/${profile.user_id}`);
  };
  const editProfileHandler = (e) => {
    e.stopPropagation();
    redirect(`/profile/update/${profile.user_id}`);
  };
  const followUser = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {profile === "no usres" ? (
        <div className={styles.noUsreFound}>
          <h3>Sorry, We Didn't Found Any Usres {": ("}</h3>
        </div>
      ) : (
        <div className={styles.searchResult} onClick={OpenProfileHandler}>
          <img src={profile.avatar_url} alt="" />
          <div className={styles.nameAndUserName}>
            <h3>{profile.username}</h3>
            <p>@{profile.user_id}</p>
          </div>
          {profile.user_id === decodedToken.user_id ? (
            <Button text="Edit Profile" onClick={editProfileHandler} />
          ) : (
            <Button text="Follow" onClick={followUser} />
          )}
        </div>
      )}
    </>
  );
};
export default SearchResult;
