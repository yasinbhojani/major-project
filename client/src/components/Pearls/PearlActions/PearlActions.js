import React from "react";

import LikeControl from "./Like/LikeControl";
import CommentControl from "./Comment/CommentControl";

import styles from "./PearlActions.module.css";

const PearlActions = (props) => {
  return (
    <div className={styles.actioncontainer}>
      <LikeControl {...props} />
      <CommentControl {...props} />
    </div>
  );
};

export default PearlActions;
