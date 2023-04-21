import React, { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import styles from "./Comments.module.css";

const Comments = ({ post_id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);

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

  let content = <p>Loading...</p>;

  if (error) {
    content = <p>An Error Occured</p>;
  }

  if (comments.length > 0) {
    content = comments.map((comment) => {
      return <Comment key={comment.comment_id} {...comment} />;
    });
  }

  if(comments.length === 0 && !error && !isLoading) {
    content = <p>No Comments Found</p>
  } 
  
  return <div className={styles.comments}>{content}</div>;
};

export default Comments;
