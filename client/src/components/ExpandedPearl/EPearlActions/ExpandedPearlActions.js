import React, { useEffect, useState } from "react";
import styles from "./ExpandedPearlActions.module.css";
import LikeControl from "../../Pearls/Pearl/PearlActions/Like/LikeControl";
import CommentControl from "../../Pearls/Pearl/PearlActions/Comment/CommentControl";
import BookmarkControl from "../../Pearls/Pearl/PearlActions/Bookmark/BookmarkControl";

const ExpandedPearlActions = (props) => {
  const {
    likes: likesCount,
    comments: commentsCount,
    bookmarks: bookmarksCount,
  } = props;

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [bookmarks, setBookmarks] = useState(0);

  useEffect(() => {
    setLikes(likesCount);
    setComments(commentsCount);
    setBookmarks(bookmarksCount);
  }, [likesCount, commentsCount, bookmarksCount]);

  return (
    <div>
      <div className={styles.stats}>
        <p>
          <strong>{likes}</strong> Likes
        </p>
        <p>
          <strong>{comments}</strong> Comments
        </p>
        <p>
          <strong>{bookmarks}</strong> Bookmarks
        </p>
      </div>
      <div className={styles.controls}>
        <LikeControl {...props} displayCount={false} setLikes={setLikes} />
        <CommentControl {...props} displayCount={false} />
        <BookmarkControl
          {...props}
          displayCount={false}
          setBookmarks={setBookmarks}
        />
      </div>
    </div>
  );
};

export default ExpandedPearlActions;
