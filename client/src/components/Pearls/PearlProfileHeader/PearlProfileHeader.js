import React from "react";
import styles from "./PearlProfileHeader.module.css";
import verified from "../../../assets/Profile/verified.svg";
import ReactTimeAgo from "react-time-ago";

const PearlProfileHeader = (props) => {
  const date = new Date(props.created_date);

  return (
    <div className={styles.profile}>
      <p className={styles.username}>{props.username}</p>
      {props.followers > 20 && (
        <img src={verified} className={styles.verified} />
      )}
      <p className={styles.author_id}>@{props.author_id}</p>
      <p style={{ opacity: "0.8" }}>•</p>
      <ReactTimeAgo
        date={date}
        locale="en-IN"
        timeStyle="twitter"
        className={styles.time}
      />
    </div>
  );
};

export default PearlProfileHeader;
