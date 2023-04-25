import { useEffect } from "react";
import styles from "./Bookmarks.module.css";
import PearlsInfiniteContainer from "../../components/Pearls/PearlsInfiniteContainer/PearlsInfiniteContainer";

const Bookmarks = () => {
  useEffect(() => {
    document.title = "Bookmarks / Shell";
  }, []);

  return (
    <div className={styles.bookmark}>
         <div className={styles.heading}>
          <h2>Bookmarks</h2>
        </div>
        <div className={styles.placeholder}></div>
      <PearlsInfiniteContainer flag="bookmarks" />
    </div>
  );
};
export default Bookmarks;
