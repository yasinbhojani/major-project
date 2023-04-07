import React, { useState, useEffect } from "react";
import styles from "./LikeControl.module.css";

import likeRedImage from "../../../../../assets/Pearls/likered.svg";
import likeImage from "../../../../../assets/Pearls/like.svg";

const LikeControl = (props) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { likes, like_exists: likeExists } = props;

  useEffect(() => {
    setLikeCount(likes);
    setIsLiked(likeExists);
  }, [likes, likeExists]);

  const onLikeHandler = (e) => {
    e.stopPropagation();
    const flag = isLiked ? "unlike" : "like";

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/pearl/like`, {
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

    if (flag === "like") {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    } else {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    }
  };

  const imageSource = isLiked ? likeRedImage : likeImage;

  return (
    <div className={styles.likes} onClick={onLikeHandler}>
      <div className={styles.svgcontainer}>
        <img src={imageSource} alt="red like icon" />
      </div>
      <p>{likeCount}</p>
    </div>
  );
};

export default LikeControl;
