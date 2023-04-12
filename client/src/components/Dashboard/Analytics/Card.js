import { useEffect, useState } from "react";
import Button from "../../UI/Button/Button";
import styles from "./Cards.module.css";
const Card = (props) => {
  const tableName = props.table;
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/dashboard/SQLW`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        query: `SELECT COUNT(*) as count FROM ${tableName};`,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        console.log(details[0].count);
        setData(details[0].count);
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });
  }, [tableName]);
  return (
    <div className={styles.card}>
      <div>
        <img src={props.icon} alt="" />
      </div>
      <h1>{data}</h1>
      <p>{props.text}</p>
      <Button text="see info" />
    </div>
  );
};
export default Card;
