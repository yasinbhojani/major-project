import React from "react";
import styles from "./CommentBox.module.css";
import Avatar from "../../Avatar/Avatar";

const CommentBox = () => {
  const submitComment = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.commentbox} onSubmit={submitComment}>
      <div className={styles.avatarinput}>
        <Avatar alt="loggedin user avatar" />
        <input placeholder="Comment your reply" />
      </div>
      <button type="submit">Comment</button>
    </form>
  );
};

export default CommentBox;
