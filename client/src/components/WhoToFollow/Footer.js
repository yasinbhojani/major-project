import { useNavigate } from "react-router-dom";
import styles from "./WhoToFollow.module.css";
const Footer = (props) => {
  const redirect = useNavigate();
  const addClass = () => {
    if (props.records === 1) {
      return styles.oneRecord;
    }
    if (props.records === 2) {
      return styles.twoRecords;
    }
    if (props.records === 3) {
      return styles.threeRecords;
    }
  };
  return (
    <div className={addClass()}>
      <div className={styles.footer}>
        <p onClick={() => redirect("/about")}>About</p>•
        <p>
          <a
            href="https://github.com/yasinbhojani/major-project"
            target="_blank"
            rel="noreferrer"
          >
            Contribute
          </a>
        </p>
        •<p onClick={() => redirect("/career")}>Career</p>
      </div>
      <p>
        © 2023 Team <span>Shell</span>
      </p>
    </div>
  );
};
export default Footer;
