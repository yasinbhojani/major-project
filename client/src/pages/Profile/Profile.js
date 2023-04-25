import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileDetails from "../../components/Profile/ProfileDetails";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/UI/Button/BackButton";
import PearlsInfiniteContainer from "../../components/Pearls/PearlsInfiniteContainer/PearlsInfiniteContainer";

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
    total_posts: 0,
  });

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/profile/openProfile/${user_id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        if (!details.ok) {
          redirect("/");
        }
        setUserObject(details.profileData);
        document.title = `${details.username} (@${details.user_id}) / Shell`;
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });
  }, [user_id, redirect]);

  return (
    <div className={styles.Profile}>
      <BackButton />
      <ProfileHeader userObject={userObject} user_id={user_id} />
      <ProfileDetails userObject={userObject} />
      <PearlsInfiniteContainer user_id={user_id} />
    </div>
  );
};
export default Profile;
