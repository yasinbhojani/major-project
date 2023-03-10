import styles from "./Search.module.css";
import Button from "../../components/UI/Button/Button";
import { useEffect, useRef, useState } from "react";
import SearchResult from "../../components/Search/SearchResult";
import SearchDefaultIcon from "../../assets/Search/Search.svg";
const Search = (props) => {
  const [searchedUser, setSearchedUser] = useState("");
  const [result, setResult] = useState();
  const setTimeoutRef = useRef(null);

  const searchUser = () => {
    if (searchedUser.trim() === "") {
      setResult([]);
      return;
    }

    fetch(
      `${
        process.env.REACT_APP_API_ENDPOINT
      }/api/profile/searchProfile/${searchedUser.trim()}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        if (details.ok) {
          setResult(details.profiles);
        } else {
          setResult(details.profiles);
        }
      });
  };

  useEffect(() => {
    setTimeoutRef.current = setTimeout(() => {
      searchUser();
    }, 500);

    return () => {
      clearTimeout(setTimeoutRef.current);
    };
    // eslint-disable-next-line
  }, [searchedUser]);

  const searchUserHandler = (e) => {
    setSearchedUser(e.target.value);
  };

  return (
    <>
      <form className={styles.SearchPage} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="# Search Users"
            className={styles.searchInput}
            onChange={searchUserHandler}
            value={searchedUser}
            required
          />
          <Button
            text="Search"
            className={styles.searchBtn}
            onClick={searchUser}
          />
        </div>
        {result && <SearchResult profiles={result} />}
      </form>
      <div className={styles.noConversation}>
        <img src={SearchDefaultIcon} alt="" />
        <h2>Search Users</h2>
      </div>
    </>
  );
};
export default Search;
