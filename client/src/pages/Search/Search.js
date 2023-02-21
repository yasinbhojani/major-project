import styles from "./Search.module.css";
import Button from "../../components/UI/Button/Button";
import { useState } from "react";
import SearchResult from "../../components/Search/SearchResult";
const Search = (props) => {
  const [searchedUser, setSearchedUser] = useState();
  const [result, setResult] = useState();
  const searchUser = () => {
    fetch(
      `http://localhost:8080/profile/searchProfile/${searchedUser.trim()}`,
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
          setResult(details);
        } else {
          setResult("no usres");
        }
      });
    // setSearchedUser("");
  };
  const searchUserHandler = (e) => {
    setSearchedUser(e.target.value);
    searchUser();
  };
  return (
    <>
      <div className={styles.SearchPage}>
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
        {result && <SearchResult profile={result} />}
      </div>
    </>
  );
};
export default Search;
