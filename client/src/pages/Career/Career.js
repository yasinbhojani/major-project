import styles from "./Career.module.css";
import logo from "../../assets/About/logo.png";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import icon from "../../assets/Career/team.svg";
const Career = () => {
  const redirect = useNavigate();
  return (
    <div className={styles.career}>
      <nav>
        <div className={styles.logoAndField}>
          <img
            src={logo}
            alt=""
            onClick={() => {
              redirect("/");
            }}
          />
          <h1>Career</h1>
        </div>
        <div className={styles.NavBtns}>
          <button className={styles.navButton}>
            <a href="#mission">Our Mission</a>
          </button>
          <button className={styles.navButton}>
            <a href="#features">Features</a>
          </button>
          <button
            className={styles.navButton}
            onClick={() => {
              redirect("/about");
            }}
          >
            About
          </button>
          <Button
            text="Shell.com"
            onClick={() => {
              redirect("/");
            }}
            className={styles.shellButton}
          />
        </div>
      </nav>
      <div className={styles.header}>
        <div>
          <h1>Join Our Team</h1>
          <p>
            If you're interested in joining our team, please check out our
            current job openings and submit your application. We can't wait to
            hear from you and see how you can help us continue to grow and
            thrive!
          </p>
          <Button text="See open jobs" />
        </div>
        <img src={icon} alt="" width="40%" />
      </div>
    </div>
  );
};
export default Career;
