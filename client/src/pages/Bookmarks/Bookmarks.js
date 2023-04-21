import { useEffect } from "react";
import styles from "./Bookmarks.module.css";

const Bookmarks = () => {
  useEffect(() => {
    document.title = "Bookmarks / Shell";
  }, []);

  return <div className={styles.bookmark}>Bookmark</div>;
};
export default Bookmarks;
