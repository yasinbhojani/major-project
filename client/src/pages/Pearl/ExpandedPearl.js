import React, { useEffect, useState } from "react";
import styles from "./ExpandedPearl.module.css";
import { useParams } from "react-router-dom";
import ExpandedPearlHeader from "../../components/ExpandedPearl/EPearlHeader/ExpandedPearlHeader";
import BackButton from "../../components/UI/Button/BackButton";
import ExpandedPearlBody from "../../components/ExpandedPearl/EPearlBody/ExpandedPearlBody";
import ExpandedPearlActions from "../../components/ExpandedPearl/EPearlActions/ExpandedPearlActions";

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
        console.log(data.post);
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
    </div>
  );
};

export default ExpandedPearl;
