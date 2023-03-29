import React from "react";
import styles from "./Pearl.module.css";
import PearlProfileHeader from "../PearlProfileHeader/PearlProfileHeader";
import PearlActions from "../PearlActions/PearlActions";

const Pearl = (props) => {
  return (
    <div key={props.post_id} className={styles.container}>
      <div className={styles.avatarcontainer}>
        <img src={props.avatar_url} className={styles.avatar} alt="avatar" />
      </div>
      <div className={styles.content}>
        <PearlProfileHeader {...props} />
        <p className={styles.text}>{props.post_content}</p>
        {props.media_url && (
          <img src={props.media_url} className={styles.image} alt="media" />
        )}
        <PearlActions {...props} />
      </div>
    </div>
  );
};

export default Pearl;
