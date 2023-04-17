import React from "react";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import styles from "./PearlProfileHeader.module.css";
import verified from "../../../../assets/Profile/verified.svg";

const PearlProfileHeader = (props) => {
  const navigate = useNavigate();
  const date = new Date(props.created_date);

  const redirectToProfile = (event) => {
    event.stopPropagation();
    navigate(`/profile/${props.author_id}`);
  };

  return (
    <div className={styles.profile}>
      <p className={styles.username} onClick={redirectToProfile}>
        {props.username}
      </p>
      {props.followers > 20 && (
        <img src={verified} className={styles.verified} alt="verified emblem" />
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
