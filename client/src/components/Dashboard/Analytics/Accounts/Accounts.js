import { useEffect, useState } from "react";
import styles from "./Accounts.module.css";
import dateFormater from "../../../../functions/dateFormater";
import LineChart from "../ChartTypes/LineChart";
const Accounts = (props) => {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/dashboard/analytics/accounts`,
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
              label: "Accounts Statistics",
              data: details.map((data) => Math.floor(data.users_joined)),
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
      <h1>New Accounts Created</h1>
      <div className={styles.graph}>
        {data !== "" && <LineChart AccountsData={data} text="Accounts" />}
      </div>
    </div>
  );
};
export default Accounts;
