import React from "react";
import styles from "./BookmarkControl.module.css";

import bookmarkImg from "../../../../../assets/Pearls/bookmark.svg";

const BookmarkControl = () => {
  const onBookmarkHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.bookmarks} onClick={onBookmarkHandler}>
      <div className={styles.svgcontainer}>
        <img src={bookmarkImg} alt="bookmark icon" />
      </div>
      <p>0</p>
    </div>
  );
};

export default BookmarkControl;
