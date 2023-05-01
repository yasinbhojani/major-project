import React, { useEffect, useState } from "react";
import styles from "./ExpandedPearlBody.module.css";
import useTransformContent from "../../../hooks/useTransformContent";

const ExpandedPearlBody = (props) => {
  const transform = useTransformContent();
  const [content, setContent] = useState("");
  const date = new Date(props.created_date);
  const time = new Date(props.created_date);
  const { post_content } = props;

  useEffect(() => {
    if (!post_content) {
      return;
    }

    const temp_content = transform(post_content);
    setContent(temp_content);

    //eslint-disable-next-line
  }, [post_content]);

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
      <pre className={styles.textcontent}>{content}</pre>
      {props.media_url && (
        <a target="_blank" href={props.media_url} rel="noreferrer">
          <img src={props.media_url} alt="media" className={styles.media} />
        </a>
      )}
      <p className={styles.timestamp}>
        {formattedTime.toUpperCase()} • {newDate}
      </p>
    </div>
  );
};

export default ExpandedPearlBody;
