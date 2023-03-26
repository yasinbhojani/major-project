import calendar from "../../assets/Profile/calendar.svg";
import location from "../../assets/Profile/location.svg";
import styles from "./ProfileDetails.module.css";
const ProfileDetails = (props) => {
  let userObject = props.userObject;
  const date = new Date(userObject.joined_date).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className={styles.profileDetailsBioAndAddress}>
      <div className={styles.bio}>
        <p>{userObject.bio}</p>
      </div>
      <div className={styles.follow}>
        <span>
          <p>{userObject.following}</p> Following
        </span>
        <span>
          <p>{userObject.followers}</p> Followers
        </span>
        <span>
          <p>0</p> Pearls
        </span>
      </div>
      <div className={styles.date}>
        <span>
          <img src={calendar} alt="" /> Joined {date}
        </span>
        {userObject.location !== null && (
          <span>
            <img src={location} alt="" /> {userObject.location}
          </span>
        )}
      </div>
    </div>
  );
};
export default ProfileDetails;
