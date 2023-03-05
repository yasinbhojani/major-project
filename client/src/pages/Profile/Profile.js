import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileDetails from "../../components/Profile/ProfileDetails";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/UI/Button/BackButton";

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
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/profile/openProfile/${user_id}`, {
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
      <BackButton />
      <ProfileHeader userObject={userObject} user_id={user_id} />
      <ProfileDetails userObject={userObject} />
    </div>
  );
};
export default Profile;
