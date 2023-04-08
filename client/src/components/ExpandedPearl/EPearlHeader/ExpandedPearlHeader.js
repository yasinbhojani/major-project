import React from "react";
import styles from "./ExpandedPearlHeader.module.css";
import verified from "../../../assets/Profile/verified.svg";

const ExpandedPearlHeader = (props) => {
  return (
    <header className={styles.header}>
      <img
        className={styles.avatar}
        src={props.avatar_url}
        alt="profile avatar"
      />
      <div>
        <p className={styles.username}>
          {props.username}
          {props.followers > 20 && (
            <img
              src={verified}
              className={styles.verified}
              alt="verify check"
            />
          )}
        </p>
        <p className={styles.user_id}>@{props.author_id}</p>
      </div>
    </header>
  );
};

export default ExpandedPearlHeader;
