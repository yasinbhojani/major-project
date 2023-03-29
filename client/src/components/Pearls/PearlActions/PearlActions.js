import React, { useState } from "react";

import styles from "./PearlActions.module.css";

import likeImage from "./../../../assets/Pearls/like.svg";
import likeRedImage from "../../../assets/Pearls/likered.svg";

const PearlActions = (props) => {
  const [imageSource, setImageSource] = useState(likeImage);
  const [likeCount, setLikeCount] = useState(0);

  const onLikeHandler = () => {
    if (imageSource === likeImage) {
      setImageSource(likeRedImage);
      setLikeCount(likeCount + 1);
    } else {
      setImageSource(likeImage);
      setLikeCount(likeCount - 1);
    }
  };

  console.log(props);
  return (
    <div className={styles.actioncontainer}>
      <div className={styles.likes}>
        <img src={imageSource} onClick={onLikeHandler} alt="like icon" />
        <p>{likeCount}</p>
      </div>
    </div>
  );
};

export default PearlActions;
