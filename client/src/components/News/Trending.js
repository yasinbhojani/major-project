import styles from "./Trending.module.css";
const trendingTerms = [
  "India",
  "Tesla",
  "Apple",
  "Twitter",
  "Space",
  "NASA",
  "YouTube",
  "Meta",
];
const Trending = (props) => {
  const getValues = (e) => {
    const current_date = new Date().toISOString().replace(/T.*/, "");
    props.featchNews(
      `https://newsapi.org/v2/top-headlines?q=${e.target.innerText
        .slice(1)
        .trim()}&from=${current_date}&sortBy=publishedAt&apiKey=fbb5f3957a4a4a9ba8950b6e78849172`
    );
  };
  return (
    <>
      <div className={styles.Trending}>
        <h3>Trending Topics 📈</h3>
      </div>
      <div className={styles.SearchTerms}>
        {trendingTerms.map((term) => {
          return (
            <p onClick={getValues} key={term}>
              # {term}
            </p>
          );
        })}
      </div>
    </>
  );
};
export default Trending;
