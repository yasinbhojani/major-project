import styles from "./Analytics.module.css";

import jwt_decode from "jwt-decode";

import Greets from "../../components/Analytics/Greets";

const Analytics = () => {
  let decodedToken;

  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }

  console.log(decodedToken);

  return (
    <>
      <div className={styles.Analytics}>
        <Greets name={decodedToken.user_id} />
        <h2>Overview</h2>
      </div>
    </>
  );
};
export default Analytics;
