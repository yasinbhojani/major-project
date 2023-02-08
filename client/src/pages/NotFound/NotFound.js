import { Link } from "react-router-dom";

import NotFoundVector from "../../assets/404-Error.svg";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <section className={styles.section}>
      <img src={NotFoundVector} alt="" />
      <h2>Page Not Found</h2>
      <Link to="/" >Go Back to Home</Link>
    </section>
  );
};

export default NotFound;
