import styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import backButton from "../../assets/Profile/backButton.svg";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileDetails from "../../components/Profile/ProfileDetails";
import { useParams, useNavigate } from "react-router-dom";

const Profile = (props) => {
  const { user_id } = useParams();
  const redirect = useNavigate();
  const [userObject, setUserObject] = useState({
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
    fetch(`http://localhost:8080/profile/openProfile/${user_id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        if (!details.ok) {
          redirect("/");
        }
        setUserObject(details);
      });
  }, [user_id, redirect]);

  return (
    <div className={styles.Profile}>
      <Link to="/">
        <div className={styles.backButtonIcon}>
          <img src={backButton} alt="" />
        </div>
      </Link>
      <ProfileHeader userObject={userObject} user_id={user_id} />
      <ProfileDetails userObject={userObject} />
    </div>
  );
};
export default Profile;
