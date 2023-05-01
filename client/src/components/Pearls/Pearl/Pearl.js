import React, { useEffect, useState } from "react";
import styles from "./Pearl.module.css";
import PearlProfileHeader from "./PearlProfileHeader/PearlProfileHeader";
import PearlActions from "./PearlActions/PearlActions";
import { useNavigate } from "react-router-dom";
import useTransformContent from "../../../hooks/useTransformContent";

const Pearl = (props) => {
  const { post_content } = props;
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const transform = useTransformContent();

  const pearlOnClickHandler = () => {
    navigate(`/pearl/${props.post_id}`);
  };

  useEffect(() => {
    if (!post_content) {
      return;
    }

    const temp_content = transform(post_content);
    setContent(temp_content)
    
    //eslint-disable-next-line
  }, [post_content]);

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
        <pre className={styles.text}>{content}</pre>
        {props.media_url && (
          <img src={props.media_url} className={styles.image} alt="media" />
        )}
        <PearlActions {...props} />
      </div>
    </div>
  );
};

export default Pearl;
