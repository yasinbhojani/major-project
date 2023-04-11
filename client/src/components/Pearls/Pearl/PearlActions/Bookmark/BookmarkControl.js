import React, { useState, useEffect } from "react";
import styles from "./BookmarkControl.module.css";

import bookmarkImg from "../../../../../assets/Pearls/bookmark.svg";
import bookmarkImgFilled from "../../../../../assets/Pearls/bookmark_filled.svg";

const BookmarkControl = (props) => {
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { bookmarks, bookmark_exists: bookmarkExists } = props;

  useEffect(() => {
    setBookmarkCount(bookmarks);
    setIsBookmarked(bookmarkExists);
  }, [bookmarks, bookmarkExists]);

  const onBookmarkHandler = (e) => {
    e.stopPropagation();
    const flag = isBookmarked ? "unbookmark" : "bookmark";

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/pearl/bookmark`, {
      method: "POST",
      body: JSON.stringify({
        flag: flag,
        post_id: props.post_id,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });

    if (flag === "bookmark") {
      props.setBookmarks && props.setBookmarks((bookmarks) => bookmarks + 1);
      setIsBookmarked(true);
      setBookmarkCount(bookmarkCount + 1);
    } else {
      props.setBookmarks && props.setBookmarks((bookmarks) => bookmarks - 1);
      setIsBookmarked(false);
      setBookmarkCount(bookmarkCount - 1);
    }
  };

  const imageSource = isBookmarked ? bookmarkImgFilled : bookmarkImg;

  return (
    <div className={styles.bookmarks} onClick={onBookmarkHandler}>
      <div className={styles.svgcontainer}>
        <img src={imageSource} alt="bookmark icon" />
      </div>
      {props.displayCount && <p>{bookmarkCount}</p>}
    </div>
  );
};

export default BookmarkControl;
