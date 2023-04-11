import React, { useEffect, useState } from "react";
import styles from "./ExpandedPearlActions.module.css";
import LikeControl from "../../Pearls/Pearl/PearlActions/Like/LikeControl";
import CommentControl from "../../Pearls/Pearl/PearlActions/Comment/CommentControl";
import BookmarkControl from "../../Pearls/Pearl/PearlActions/Bookmark/BookmarkControl";

const ExpandedPearlActions = (props) => {
  const { likes: likesCount, comments: commentsCount } = props;

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    setLikes(likesCount);
    setComments(commentsCount);
  }, [likesCount, commentsCount]);

  return (
    <div>
      <div className={styles.stats}>
        <p>
          <strong>{likes}</strong> Likes
        </p>
        <p>
          <strong>{comments}</strong> Comments
        </p>
      </div>
      <div className={styles.controls}>
        <LikeControl {...props} displayCount={false} setLikes={setLikes} />
        <CommentControl {...props} displayCount={false} />
        <BookmarkControl {...props} displayCount={false} />
      </div>
    </div>
  );
};

export default ExpandedPearlActions;
