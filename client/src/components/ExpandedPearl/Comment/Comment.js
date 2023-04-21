import React from "react";
import Avatar from "../../Avatar/Avatar";
import styles from "./Comment.module.css";
import verified from "../../../assets/Profile/verified.svg";

const Comment = (props) => {
  return (
    <div className={styles.comment}>
      <Avatar src={props.avatar_url} />
      <div className={styles.content}>
        <div className={styles.header}>
          <p>
            <b>{props.username}</b>
            {props.followers > 20 && (
              <img
                src={verified}
                className={styles.verified}
                alt="verified svg"
              />
            )}
            <span>@{props.user_id}</span>
          </p>
        </div>
        <div>{props.comment_content}</div>
      </div>
    </div>
  );
};

export default Comment;
