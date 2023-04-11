import React from "react";

import LikeControl from "./Like/LikeControl";
import CommentControl from "./Comment/CommentControl";

import styles from "./PearlActions.module.css";
import BookmarkControl from "./Bookmark/BookmarkControl";

const PearlActions = (props) => {
  return (
    <div className={styles.actioncontainer}>
      <LikeControl {...props} displayCount={true} />
      <CommentControl {...props} displayCount={true} />
      <BookmarkControl {...props} displayCount={true} />
    </div>
  );
};

export default PearlActions;
