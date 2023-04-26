import { useState } from "react";
import QueryReport from "../../../components/Dashboard/SQLWorkbench/QueryReport";
import Button from "../../../components/UI/Button/Button";
import styles from "./SQLW.module.css";
// import bg from "../../../assets/Dashboard/SQLW/bgimg.svg";
import PredefinedQuery from "../../../components/Dashboard/SQLWorkbench/PredefinedQuery";
const SQLW = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const predefinedQuery = [
    {
      onClick: () => {
        querryButtons("users");
      },
      text: "Users",
    },
    {
      onClick: () => {
        querryButtons("posts");
      },
      text: "Pearls",
    },
    {
      onClick: () => {
        querryButtons("comments");
      },
      text: "comments",
    },
    {
      onClick: () => {
        querryButtons("chats");
      },
      text: "Chats",
    },
    {
      onClick: () => {
        querryButtons("conversation");
      },
      text: "Conversation",
    },
    {
      onClick: () => {
        querryButtons("notifications");
      },
      text: "Notifications",
    },
    {
      onClick: () => {
        querryButtons("likes");
      },
      text: "Likes",
    },
    {
      onClick: () => {
        querryButtons("user_followers");
      },
      text: "User Followers",
    },
    {
      onClick: () => {
        querryButtons("bookmarks");
      },
      text: "Bookmarks",
    },
  ];
  const [json, setJson] = useState(false);
  const [page, setPage] = useState(<></>);
  const handleChange = (event) => {
    if (event.target.checked) {
      setJson(true);
    } else {
      setJson(false);
    }
  };
  const closeTerminal = () => {
    setPage(<></>);
  };
  const queryOnChangeHandler = (e) => {
    setQuery(e.target.value);
    setError(false);
  };
  const runQuery = () => {
    if (query.trim() !== "") {
      setPage(<QueryReport query={query} close={closeTerminal} json={json} />);
      setQuery("");
    } else {
      setError(true);
    }
  };
  const querryButtons = (e) => {
    setPage(
      <QueryReport
        query={`select * from ${e}`}
        close={closeTerminal}
        json={json}
      />
    );
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
            {predefinedQuery.map((btn) => {
              return (
                <PredefinedQuery
                  onClick={btn.onClick}
                  text={btn.text}
                  key={Math.random()}
                />
              );
            })}
          </div>
          <div class="checkbox-wrapper-6">
            <p>Table</p>
            <input
              class="tgl tgl-light"
              id="cb1-6"
              type="checkbox"
              onChange={handleChange}
            />
            <label class="tgl-btn" for="cb1-6" />
            <p>JSON</p>
          </div>
        </div>
        {page}
      </div>
    </>
  );
};
export default SQLW;
