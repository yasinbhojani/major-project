import styles from "./NewsSearchResult.module.css";
import shellNewsImg from "../../assets/News/ShellNews.png";
import DetailedNews from "./DetailedNews";
import { useEffect, useState } from "react";
const NewsSearchResult = (props) => {
  const [page, setPage] = useState();
  useEffect(() => {
    setPage(
      <>
        {props.articles.length === 0 ? (
          <div className={styles.noNewsError}>
            <h3>Sorry, We Didn't Found Anything {": ("}</h3>
          </div>
        ) : (
          props.articles.map((news) => {
            return (
              <div
                onClick={() => {
                  setPage(<DetailedNews newsContent={news} />);
                }}
                className={styles.NewsCard}
                target="blank"
                key={news.title}
              >
                <div className={styles.NewsBanner}>
                  <img
                    src={
                      (news.urlToImage === null && shellNewsImg) ||
                      (news.urlToImage === undefined && shellNewsImg) ||
                      (news.urlToImage === "" && shellNewsImg) ||
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
              </div>
            );
          })
        )}
      </>
    );
  }, [props.articles]);
  return page;
};
export default NewsSearchResult;
