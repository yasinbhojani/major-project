import { useNavigate } from "react-router-dom";
import styles from "./WhoToFollow.module.css";
const Footer = (props) => {
  const redirect = useNavigate();
  return (
    <div className={styles.Record}>
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
