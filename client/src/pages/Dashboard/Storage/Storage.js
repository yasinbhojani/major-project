import { useState } from "react";
import firestore from "../../../assets/Dashboard/Storage/firebase.png";
import link from "../../../assets/Dashboard/Storage/link.svg";
import back from "../../../assets/Dashboard/Storage/back.svg";
import Paths from "../../../components/Dashboard/Storage/Paths";
import styles from "./Storage.module.css";
import ProfilePhotos from "../../../components/Dashboard/Storage/ProfilePhotos";
import Posts from "../../../components/Dashboard/Storage/Posts";
const Storage = () => {
  const onPostsClick = () => {
    setPage(<Posts />);
  };
  const onProfileClick = () => {
    setPage(<ProfilePhotos />);
  };
  const onBackClick = () => {
    setPage(<Paths posts={onPostsClick} profile={onProfileClick} />);
  };
  const [page, setPage] = useState(
    <Paths posts={onPostsClick} profile={onProfileClick} />
  );
  return (
    <div className={styles.storage}>
      <div className={styles.header}>
        <a href="https://firebase.google.com/" target="_blank" rel="noreferrer">
          <img src={firestore} alt="" />
        </a>
        <a
          href="https://console.firebase.google.com/u/2/project/shell-project-4e7d7/storage/shell-project-4e7d7.appspot.com/files"
          target="_blank"
          rel="noreferrer"
        >
          <button>Storage</button>
        </a>
      </div>
      <div className={styles.paths}>
        <div className={styles.url}>
          <img src={link} alt="" />
          <p>gs://shell-project-4e7d7.appspot.com</p>
          <img
            src={back}
            alt=""
            className={styles.backButton}
            onClick={onBackClick}
          />
        </div>
        {page}
      </div>
    </div>
  );
};
export default Storage;
