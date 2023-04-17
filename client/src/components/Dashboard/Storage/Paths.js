import styles from "./Paths.module.css";
import file from "../../../assets/Dashboard/Storage/File.svg";
const Paths = (props) => {
  return (
    <div className={styles.pathButtons}>
      <button className={styles.firestoreFile} onClick={props.posts}>
        <img src={file} alt="" /> posts/
      </button>
      <button className={styles.firestoreFile} onClick={props.profile}>
        <img src={file} alt="" /> profile/
      </button>
    </div>
  );
};
export default Paths;
