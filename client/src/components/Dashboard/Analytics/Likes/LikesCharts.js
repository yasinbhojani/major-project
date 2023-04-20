import { useEffect, useState } from "react";
import styles from "../Accounts/Accounts.module.css";
import dateFormater from "../../../../functions/dateFormater";
import LineChart from "../ChartTypes/LineChart";
const LikesCharts = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/dashboard/analytics/likes`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        setData({
          labels: details.map((data) => dateFormater(data.dateonly)),
          datasets: [
            {
              label: "Likes Statistics",
              data: details.map((data) => Math.floor(data.users_likes)),
              backgroundColor: "#dbdeff",
              borderColor: "#7076fe",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });
  }, []);
  return (
    <div className={styles.Statistics}>
      <h1>Pearls Liked</h1>
      <div className={styles.graph}>
        {data !== "" && <LineChart AccountsData={data} text="Likes" />}
      </div>
    </div>
  );
};
export default LikesCharts;
