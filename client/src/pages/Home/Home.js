import styles from "./Home.module.css";
import PearlsInfiniteContainer from "../../components/Pearls/PearlsInfiniteContainer/PearlsInfiniteContainer";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Home</h2>
      </div>
      <div className={styles.placeholder}></div>
      <PearlsInfiniteContainer />
    </div>
  );
};

export default Home;
