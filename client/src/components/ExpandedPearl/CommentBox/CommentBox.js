import React, { useState } from "react";
import styles from "./CommentBox.module.css";
import Avatar from "../../Avatar/Avatar";

const CommentBox = ({ post_id, setTempComments, setComments }) => {
  const [comment, setComment] = useState("");
  const [buttonIsEnabled, setButtonIsEnabled] = useState(false);

  const commentChangeHandler = (e) => {
    setComment(e.target.value);

    if (e.target.value === "" || e.target.value.trim().length > 200) {
      setButtonIsEnabled(false);
    } else {
      setButtonIsEnabled(true);
    }
  };

  const submitComment = (e) => {
    e.preventDefault();

    if (comment === "") {
      return;
    }

    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/pearl/comment", {
      method: "POST",
      body: JSON.stringify({
        comment: comment.trim(),
        postID: post_id,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.message);
        }
        setTempComments((cmnts) => [comment.trim(), ...cmnts]);
        setComments((prevState) => prevState + 1);
        setComment("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className={styles.commentbox} onSubmit={submitComment}>
      <div className={styles.avatarinput}>
        <Avatar alt="loggedin user avatar" />
        <input
          placeholder="Comment your reply"
          onChange={commentChangeHandler}
          value={comment}
        />
      </div>
      <button type="submit" disabled={!buttonIsEnabled}>
        Comment
      </button>
    </form>
  );
};

export default CommentBox;
