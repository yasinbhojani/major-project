import React from "react";
import styles from "./ExpandedPearlBody.module.css";

const ExpandedPearlBody = (props) => {
  const date = new Date(props.created_date);
  const time = new Date(props.created_date);

  const formattedTime = time.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "numeric",
  });

  const formattedDate = date
    .toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .replace(/(\d+)(st|nd|rd|th)/, "$1");

  const [day, month, year] = formattedDate.split(" ");
  const newDate = `${month} ${day}, ${year}`;

  return (
    <div>
      <p className={styles.textcontent}>{props.post_content}</p>
      {props.media_url && (
        <img src={props.media_url} alt="media" className={styles.media} />
      )}
      <p className={styles.timestamp}>
        {formattedTime.toUpperCase()} • {newDate}
      </p>
    </div>
  );
};

export default ExpandedPearlBody;
