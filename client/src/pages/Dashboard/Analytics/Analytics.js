import styles from "./Analytics.module.css";

import jwt_decode from "jwt-decode";

import Greets from "../../../components/Dashboard/Analytics/Greets";
import Cards from "../../../components/Dashboard/Analytics/Cards";
import AccountsCharts from "../../../components/Dashboard/Analytics/Accounts/AccountsCharts";
import PearlsCharts from "../../../components/Dashboard/Analytics/Pearls/PearlsCharts";
import ChatsCharts from "../../../components/Dashboard/Analytics/Chats/ChatsCharts";
import LikesCharts from "../../../components/Dashboard/Analytics/Likes/LikesCharts";

const Analytics = () => {
  let decodedToken;

  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }

  return (
    <>
      <div className={styles.Analytics}>
        <Greets name={decodedToken.user_id} />
        <div className={styles.graphs}>
          <AccountsCharts />
          <PearlsCharts />
        </div>
        <div className={styles.graphs}>
          <ChatsCharts />
          <LikesCharts />
        </div>
        <h2 id="overview">Overview</h2>
        <Cards />
        <p className={styles.blue}>
          © 2023 Team <span>Shell</span>
        </p>
      </div>
    </>
  );
};
export default Analytics;
