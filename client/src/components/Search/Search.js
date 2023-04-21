import styles from "./Search.module.css";
import { useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";
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
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
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
        <input
          type="text"
          placeholder="# Search Shell"
          className={styles.searchInput}
          onChange={searchUserHandler}
          value={searchedUser}
          required
        />
        {result && <SearchResult profiles={result} />}
      </form>
    </>
  );
};
export default Search;
