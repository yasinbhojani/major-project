import { useEffect, useState } from "react";
import styles from "./QueryReport.module.css";
const QueryReport = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const retriveData = () => {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/dashboard/SQLW`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          query: props.query,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((details) => {
          setData(details);
          console.log(details);
        })
        .catch((err) => {
          alert("An error occured, please try again later: " + err.message);
        });
    };
    retriveData();
  }, [props.query]);
  return (
    <div className={styles.Report}>
      <div className={styles.header}>
        <h1>Console</h1>
        <button onClick={props.close}>X</button>
      </div>
      {data.length === 0 ? (
        <pre>Something went Wrong !</pre>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};
export default QueryReport;
