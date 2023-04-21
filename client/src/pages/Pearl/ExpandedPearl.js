import React, { useEffect, useState } from "react";
import styles from "./ExpandedPearl.module.css";
import { useParams } from "react-router-dom";
import ExpandedPearlHeader from "../../components/ExpandedPearl/EPearlHeader/ExpandedPearlHeader";
import BackButton from "../../components/UI/Button/BackButton";
import ExpandedPearlBody from "../../components/ExpandedPearl/EPearlBody/ExpandedPearlBody";
import ExpandedPearlActions from "../../components/ExpandedPearl/EPearlActions/ExpandedPearlActions";
import CommentBox from "../../components/ExpandedPearl/CommentBox/CommentBox";
import Comments from "../../components/ExpandedPearl/Comments/Comments";

const ExpandedPearl = () => {
  const { post_id } = useParams();
  const [pearlData, setPearlData] = useState({});

  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_ENDPOINT +
        `/api/pearl/post/?post_id=${post_id}`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.message);
        }
        setPearlData(data.post);
      })
      .catch((err) => console.error(err));
  }, [post_id]);

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.pearlInfo}>
        <ExpandedPearlHeader {...pearlData} />
        <ExpandedPearlBody {...pearlData} />
        <ExpandedPearlActions {...pearlData} />
      </div>
      <div className={styles.comments}>
        <CommentBox post_id={pearlData.post_id} />
        <Comments post_id={pearlData.post_id} />
      </div>
    </div>
  );
};

export default ExpandedPearl;
