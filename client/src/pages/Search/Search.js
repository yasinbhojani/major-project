import styles from "./Search.module.css";
import Button from "../../components/UI/Button/Button";
import { useState } from "react";
import SearchResult from "../../components/Search/SearchResult";
const Search = (props) => {
  const [searchedUser, setSearchedUser] = useState("");
  const [result, setResult] = useState();
  const searchUser = () => {
    if (searchedUser.trim() === "") {
      setResult([]);
      return;
    }
    fetch(
      `http://localhost:8080/api/profile/searchProfile/${searchedUser.trim()}`,
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
  const searchUserHandler = (e) => {
    setSearchedUser(e.target.value);
    searchUser();
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
    </>
  );
};
export default Search;
