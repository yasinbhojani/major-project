import React, { useEffect, useState } from "react";

import styles from "./PearlActions.module.css";

import likeImage from "./../../../assets/Pearls/like.svg";
import likeRedImage from "../../../assets/Pearls/likered.svg";

const PearlActions = (props) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  console.log(props);
  const { likes, like_exists: likeExists } = props;

  useEffect(() => {
    setLikeCount(likes);
    setIsLiked(likeExists);
  }, [likes, likeExists]);

  const onLikeHandler = () => {
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

  return (
    <div className={styles.actioncontainer}>
      <div className={styles.likes}>
        {isLiked ? (
          <img src={likeRedImage} onClick={onLikeHandler} alt="red like icon" />
        ) : (
          <img src={likeImage} onClick={onLikeHandler} alt="like icon" />
        )}
        <p>{likeCount}</p>
      </div>
    </div>
  );
};

export default PearlActions;
