import React from "react";
import styles from "./CommentControl.module.css";

import commentImg from "../../../../assets/Pearls/chat_round.svg";

const CommentControl = () => {
  const onCommentHandler = () => {};

  return (
    <div className={styles.comments}>
      <div className={styles.svgcontainer}>
        <img src={commentImg} alt="comment icon" onClick={onCommentHandler} />
      </div>
      <p>0</p>
    </div>
  );
};

export default CommentControl;
