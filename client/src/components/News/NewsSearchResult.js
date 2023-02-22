import styles from "./NewsSearchResult.module.css";
import shellNewsImg from "../../assets/News/ShellNews.png";
const NewsSearchResult = (props) => {
  return (
    <>
      {props.articles === "No News" ? (
        <div className={styles.noNewsError}>
          <h3>Sorry, We Didn't Found Anything {": ("}</h3>
        </div>
      ) : (
        props.articles.map((news) => {
          return (
            <a
              href={news.url}
              className={styles.NewsCard}
              target="blank"
              key={Math.ceil(Math.random() * 1000)}
            >
              <div className={styles.NewsBanner}>
                <img
                  src={
                    news.urlToImage.includes(".jpeg")
                      ? shellNewsImg
                      : news.urlToImage
                  }
                  alt=""
                />
              </div>
              <div className={styles.NewsContent}>
                <h6>{news.title}</h6>
                <p>{news.description}</p>
              </div>
            </a>
          );
        })
      )}
    </>
  );
};
export default NewsSearchResult;
