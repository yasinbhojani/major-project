import styles from "./UpdateProfile.module.css";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import verified from "../../assets/Profile/verified.svg";
import UpdateForm from "../../components/UpdateProfile/UpdateForm";
const UpdateProfile = (props) => {
  const redirect = useNavigate();
  const { user_id } = useParams();
  const [userDetails, setUserDetails] = useState({
    avatar_url: "",
    bio: null,
    email: "",
    followers: 0,
    following: 0,
    is_admin: 0,
    joined_date: "",
    location: null,
    mobile: null,
    password_hash: "",
    user_id: "",
    username: "",
  });
  useEffect(() => {
    let decodedToken = null;
    if (localStorage.getItem("accessToken")) {
      decodedToken = jwt_decode(localStorage.getItem("accessToken"));
      if (user_id === decodedToken.user_id) {
        fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/api/profile/openProfile/${user_id}`,
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
            setUserDetails(details);
          });
      } else {
        redirect("/");
      }
    }
  }, [redirect, user_id]);
  return (
    <div className={styles.UpdateProfile}>
      <div className={styles.profileDetailsNameAndEdit}>
        <div className={styles.avatar_url}>
          <img src={userDetails.avatar_url} alt="" />
        </div>
        <div className={styles.userNameDetails}>
          <div className={styles.userNameAndVerified}>
            <h1>
              {userDetails.username}
              {userDetails.followers > 10 && <img src={verified} alt="" />}
            </h1>
          </div>
          <div>
            <p>@{userDetails.user_id}</p>
          </div>
        </div>
      </div>
      <UpdateForm userDetails={userDetails} />
    </div>
  );
};
export default UpdateProfile;
