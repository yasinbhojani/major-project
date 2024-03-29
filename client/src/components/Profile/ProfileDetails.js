import { useState } from "react";
import calendar from "../../assets/Profile/calendar.svg";
import location from "../../assets/Profile/location.svg";
import Modal from "../UI/Modal/Modal";
import styles from "./ProfileDetails.module.css";
import Connections from "./Connections";
const ProfileDetails = (props) => {
  let userObject = props.userObject;
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Followers");
  const [children, setChildren] = useState(<></>);
  const date = new Date(userObject.joined_date).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
  const followers = () => {
    setShow(true);
    setTitle("Followers");
    setChildren(
      <Connections
        onClose={() => setShow(false)}
        path="followers"
        message="No followers found"
      />
    );
  };
  const following = () => {
    setShow(true);
    setTitle("Following");
    setChildren(
      <Connections
        onClose={() => setShow(false)}
        path="following"
        message="This account does not follow anyone"
      />
    );
  };
  return (
    <>
      <div className={styles.profileDetailsBioAndAddress}>
        <div className={styles.bio}>
          <p>{userObject.bio}</p>
        </div>
        <div className={styles.follow}>
          <span onClick={following} className={styles.followAndFollowing}>
            <p>{userObject.following}</p> Following
          </span>
          <span onClick={followers} className={styles.followAndFollowing}>
            <p>{userObject.followers}</p> Followers
          </span>
          <span>
            <p>{userObject.total_posts}</p> Pearls
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
      {show && (
        <Modal
          onClose={() => setShow(false)}
          children={children}
          title={title}
        />
      )}
    </>
  );
};
export default ProfileDetails;
