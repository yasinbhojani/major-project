import React from "react";
import styles from "./Pearl.module.css";
import PearlProfileHeader from "./PearlProfileHeader/PearlProfileHeader";
import PearlActions from "./PearlActions/PearlActions";
import { useNavigate } from "react-router-dom";

const Pearl = (props) => {
  const navigate = useNavigate();
  const pearlOnClickHandler = () => {
    navigate(`/pearl/${props.post_id}`);
  };

  return (
    <div
      id={props.post_id}
      key={props.post_id}
      className={styles.container}
      onClick={pearlOnClickHandler}
    >
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
