import React, { useEffect, useState } from "react";
import styles from "./CommentControl.module.css";

import commentImg from "../../../../../assets/Pearls/comment_round.svg";

const CommentControl = (props) => {
  const { comments } = props;

  const [commentsCount, setCommentsCount] = useState(0);
  useEffect(() => {
    setCommentsCount(comments);
  }, [comments]);

  const onCommentHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.comments} onClick={onCommentHandler}>
      <div className={styles.svgcontainer}>
        <img src={commentImg} alt="comment icon" />
      </div>
      <p>{commentsCount}</p>
    </div>
  );
};

export default CommentControl;
