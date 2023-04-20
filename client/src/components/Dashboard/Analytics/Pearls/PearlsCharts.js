import styles from "../Accounts/Accounts.module.css";
import dateFormater from "../../../../functions/dateFormater";
import BarChart from "../ChartTypes/BarChart";
import { useEffect, useState } from "react";
const PearlsCharts = (props) => {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/dashboard/analytics/pearls`,
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
        console.log(details);
        setData({
          labels: details.map((data) => dateFormater(data.dateonly)),
          datasets: [
            {
              label: "Pearls Statistics",
              data: details.map((data) => data.users_posts),
              backgroundColor: "#7076fe",
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
      <h1>New Pearls Added</h1>
      <div className={styles.graph}>
        {data !== "" && <BarChart AccountsData={data} text="Pearls" />}
      </div>
    </div>
  );
};
export default PearlsCharts;
