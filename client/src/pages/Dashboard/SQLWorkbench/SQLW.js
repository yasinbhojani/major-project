import { useState } from "react";
import QueryReport from "../../../components/Dashboard/SQLWorkbench/QueryReport";
import Button from "../../../components/UI/Button/Button";
import styles from "./SQLW.module.css";
import bg from "../../../assets/Dashboard/SQLW/bgimg.svg";
const SQLW = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  let baground = (
    <div className={styles.SQlbg}>
      <img src={bg} alt="" />
      <div>
        <h3>SQL Workbench</h3>
        <p>
          Start writing SQL querys directy from here.
          <br />
          or click on the button to run automatically.
        </p>
      </div>
    </div>
  );
  const [page, setPage] = useState(baground);
  const closeTerminal = () => {
    setPage(baground);
  };
  const queryOnChangeHandler = (e) => {
    setQuery(e.target.value);
    setError(false);
  };
  const runQuery = () => {
    if (query.trim() !== "") {
      setPage(<QueryReport query={query} close={closeTerminal} />);
      setQuery("");
    } else {
      setError(true);
    }
  };
  const querryButtons = (e) => {
    setPage(<QueryReport query={`select * from ${e}`} close={closeTerminal} />);
  };
  return (
    <>
      <div className={styles.SQLW}>
        <div className={styles.QueryForm}>
          <div className={styles.querry}>
            <input
              type="text"
              placeholder="Run SQL Query !"
              onChange={queryOnChangeHandler}
              value={query}
              className={error ? styles.error : null}
            />
            <Button text="Run Query" onClick={runQuery} />
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              className={styles.queryBtns}
              onClick={() => {
                querryButtons("users");
              }}
            >
              Users
            </button>
            <button
              className={styles.queryBtns}
              onClick={() => {
                querryButtons("posts");
              }}
            >
              Pearls
            </button>
            <button
              className={styles.queryBtns}
              onClick={() => {
                querryButtons("chats");
              }}
            >
              Chats
            </button>
            <button
              className={styles.queryBtns}
              onClick={() => {
                querryButtons("likes");
              }}
            >
              Likes
            </button>
          </div>
        </div>
        {page}
      </div>
    </>
  );
};
export default SQLW;
