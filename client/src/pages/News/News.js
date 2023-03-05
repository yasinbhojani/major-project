import styles from "./News.module.css";
import Button from "../../components/UI/Button/Button";
import Trending from "../../components/News/Trending";
import NewsSearchResult from "../../components/News/NewsSearchResult";
import backButton from "../../assets/Profile/backButton.svg";
import { useState } from "react";
const News = (props) => {
  const [url, setUrl] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const inputChangeHandler = (e) => {
    if (e.target.value.trim() !== "") {
      const current_date = new Date().toISOString().replace(/T.*/, "");
      setSearchTerm(e.target.value);
      setUrl(
        `https://newsapi.org/v2/top-headlines?q=${e.target.value}&from=${current_date}&sortBy=publishedAt&apiKey=fbb5f3957a4a4a9ba8950b6e78849172`
      );
    }
  };
  const featchNews = (trendingUrl) => {
    fetch(url === undefined ? trendingUrl : url)
      .then((data) => {
        return data.json();
      })
      .then((news) => {
        setSearchTerm("");
        setPage(<NewsSearchResult articles={news.articles} />);
        setUrl();
      });
  };
  const [page, setPage] = useState(
    <Trending setUrl={setUrl} featchNews={featchNews} />
  );
  return (
    <div className={styles.NewsPage}>
      {page.props.featchNews ? (
        <div>
          <form
            className={styles.searchBox}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="# Search Topic"
              className={styles.searchInput}
              onChange={inputChangeHandler}
              value={searchTerm}
              required
            />
            <Button
              text="Search"
              onClick={featchNews}
              className={styles.searchBtn}
            />
          </form>
        </div>
      ) : (
        <div
          className={styles.backButton}
          onClick={() => {
            setPage(<Trending setUrl={setUrl} featchNews={featchNews} />);
          }}
        >
          <img src={backButton} alt="" />
        </div>
      )}
      {page}
    </div>
  );
};
export default News;
