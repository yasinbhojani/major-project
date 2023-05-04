import { useEffect, useState } from "react";
import styles from "./WhatsHappening.module.css";
const WhatsHappening = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/trending/tags`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        setData(details);
      })
      .catch((err) => {
        console.log("An error occured, please try again later: " + err.message);
      });
  }, []);

  return (
    <div className={styles.WhatsHappening}>
      <h1 className={styles.header}>
        {Math.random() >= 0.5 ? `Trending Now 📈` : "What’s happening"}
      </h1>
      {data &&
        data.map((tags) => {
          return (
            <div className={styles.trending} key={Math.random()}>
              <h1>#{tags.tags}</h1>
              <p>Total pearls : {tags.count}</p>
            </div>
          );
        })}
      {data && data.length === 0 && (
        <div className={styles.trending}>
          <h2>Nothing to show here</h2>
        </div>
      )}
    </div>
  );
};
export default WhatsHappening;
