import React from "react";
import styles from "./ExpandedPearlActions.module.css";

const ExpandedPearlActions = (props) => {
  return (
    <div>
      <div className={styles.stats}>
        <p>
          <strong>{props.likes}</strong> Likes
        </p>
        <p>
          <strong>{props.comments}</strong> Comments
        </p>
      </div>
    </div>
  );
};

export default ExpandedPearlActions;
