import styles from "./Analytics.module.css";

import jwt_decode from "jwt-decode";

import Greets from "../../../components/Dashboard/Analytics/Greets";
import Cards from "../../../components/Dashboard/Analytics/Cards";
import Accounts from "../../../components/Dashboard/Analytics/Accounts/Accounts";
import PearlsS from "../../../components/Dashboard/Analytics/Pearls/PearlsS";
import ChatsS from "../../../components/Dashboard/Analytics/Chats/ChatsS";
import LikesS from "../../../components/Dashboard/Analytics/Likes/LikesS";

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
          <Accounts />
          <PearlsS />
        </div>
        <div className={styles.graphs}>
          <ChatsS />
          <LikesS />
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
