import React, { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import styles from "./Comments.module.css";

const Comments = ({ post_id, tempComments }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const getComments = () => {
    if (!post_id) {
      return;
    }

    setError(false);
    setIsLoading(true);

    const query =
      process.env.REACT_APP_API_ENDPOINT +
      `/api/pearl/comments?post_id=${post_id}`;

    fetch(query, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
      })
      .catch((err) => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, [post_id]);

  // When the logged in user comments, the comment is not shown in real time. The typed comment (see: CommentBox.js, ExpandedPearl.js) will be temporarily stored inside an array on the client and be displayed here beside other comments.
  const tempCommentsContent =
    tempComments.length === 0
      ? null
      : tempComments.map((comment) => {
          return (
            <Comment
              key={Math.random().toString()}
              comment_content={comment}
              avatar_url={user.avatar_url}
              username={user.username}
              followers={user.followers}
              user_id={user.user_id}
            />
          );
        });

  let content = <p>Loading...</p>;

  if (error) {
    content = <p>An Error Occured</p>;
  }

  if (comments.length > 0 || tempCommentsContent !== null) {
    content = (
      <div>
        {tempCommentsContent}
        {comments.map((comment) => {
          return <Comment key={comment.comment_id} {...comment} />;
        })}
      </div>
    );
  }

  if (
    comments.length === 0 &&
    tempCommentsContent === null &&
    !error &&
    !isLoading
  ) {
    content = <p>No Comments Found</p>;
  }

  return <div className={styles.comments}>{content}</div>;
};

export default Comments;
