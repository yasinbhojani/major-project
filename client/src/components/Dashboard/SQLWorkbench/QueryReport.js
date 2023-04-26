import React, { useEffect, useState } from "react";
import styles from "./QueryReport.module.css";
import "./ToggleButton.css";
const QueryReport = (props) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  let json = props.json;
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
          let columnArray = [];
          for (let column in details[0]) {
            columnArray.push(column);
          }
          setColumns(columnArray);
        })
        .catch((err) => {
          alert("An error occured, please try again later: " + err.message);
        });
    };
    retriveData();
  }, [props.query]);
  return (
    <React.Fragment>
      {json === false ? (
        <div className={styles.tablecontainer}>
          <div style={{ textAlign: "right" }}>
            <button onClick={props.close} className={styles.closeTable}>
              Close Table
            </button>
          </div>

          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={Math.random().toString()}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((d) => {
                const row = Object.values(d);
                return (
                  <tr key={Math.random().toString()}>
                    {row.map((r) => (
                      <td key={Math.random().toString()}>{r}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
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
      )}
    </React.Fragment>
  );
};
export default QueryReport;
