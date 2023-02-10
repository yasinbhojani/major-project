import styles from "./SearchResult.module.css";
const SearchResult = (props) => {
  return (
    <>
      {props.articles.map((news) => {
        return (
          <a
            href={news.url}
            className={styles.NewsCard}
            target="blank"
            key={Math.ceil(Math.random() * 1000)}
          >
            <div className={styles.NewsBanner}>
              <img src={news.urlToImage} alt="" />
            </div>
            <div className={styles.NewsContent}>
              <h6>{news.title}</h6>
              <p>{news.description}</p>
            </div>
          </a>
        );
      })}
    </>
  );
};
export default SearchResult;
