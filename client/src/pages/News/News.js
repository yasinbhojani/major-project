import styles from "./News.module.css";
import Button from "../../components/UI/Button/Button";
import Treanding from "../../components/News/Treanding";
import SearchResult from "../../components/News/SearchResult";
import { useEffect, useState } from "react";
const News = (props) => {
  const [url, setUrl] = useState();
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [page, setPage] = useState(<Treanding setNews={setNews} />);
  const inputChangeHandler = (e) => {
    const joined_date = new Date().toISOString().replace(/T.*/, "");
    setSearchTerm(e.target.value);
    setUrl(
      `https://newsapi.org/v2/everything?q=${e.target.value}&from=${joined_date}&sortBy=publishedAt&apiKey=fbb5f3957a4a4a9ba8950b6e78849172`
    );
  };
  const featchNews = (e) => {
    e.preventDefault();
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((news) => {
        setNews(news.articles);
        setSearchTerm("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (news.length !== 0) {
      setPage(<SearchResult articles={news} />);
    }
  }, [news]);
  return (
    <div className={styles.NewsPage}>
      <form onSubmit={featchNews}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="# Search Topic"
            className={styles.searchInput}
            onChange={inputChangeHandler}
            value={searchTerm}
            required
          />
          <Button text="Search" type="submit" className={styles.searchBtn} />
        </div>
      </form>
      {page}
    </div>
  );
};
export default News;
