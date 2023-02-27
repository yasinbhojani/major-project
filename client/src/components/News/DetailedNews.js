import styles from "./DetailedNews.module.css";
import defaultNews from "../../assets/News/DetailedDefault.png";
import Button from "../UI/Button/Button";
const DetailedNews = (props) => {
  let newsContent = props.newsContent;
  return (
    <div className={styles.newsContent}>
      <div>
        <img
          src={newsContent.urlToImage ? newsContent.urlToImage : defaultNews}
          alt=""
          className={styles.newsImage}
        />
      </div>
      <div className={styles.titleAndDescription}>
        <h2>{newsContent.title}</h2>
        <div>
          {newsContent.description && (
            <p>
              {newsContent.description}
              <a href={newsContent.url} target="_blank" rel="noreferrer">
                {" "}
                Read More...
              </a>
            </p>
          )}
          {newsContent.author && (
            <p>
              Published By : <b>{newsContent.author}</b>
            </p>
          )}
        </div>
      </div>
      <a href={newsContent.url} target="_blank" rel="noreferrer">
        <Button text="Visit Website" className={styles.visitWeb} />
      </a>
    </div>
  );
};
export default DetailedNews;
