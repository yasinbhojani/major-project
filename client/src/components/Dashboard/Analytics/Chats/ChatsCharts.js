import { useEffect, useState } from "react";
import dateFormater from "../../../../functions/dateFormater";
import BarChart from "../ChartTypes/BarChart";
import styles from "../Accounts/Accounts.module.css";
const ChatsCharts = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/dashboard/analytics/chats`,
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
              label: "Chats Statistics",
              data: details.map((data) => Math.floor(data.users_chats)),
              backgroundColor: "#7076fe",
            },
          ],
        });
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });
  }, []);
  console.log(data);
  return (
    <div className={styles.Statistics}>
      <h1>New Chats</h1>
      <div className={styles.graph}>
        {data !== "" && <BarChart AccountsData={data} text="Chats" />}
      </div>
    </div>
  );
};
export default ChatsCharts;
