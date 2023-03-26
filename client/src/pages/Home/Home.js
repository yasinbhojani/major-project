import styles from "./Home.module.css";
import PearlsInfiniteContainer from "../../components/Pearls/PearlsInfiniteContainer/PearlsInfiniteContainer";

const Home = () => {
  return (
    <div className={styles.container}>
      <PearlsInfiniteContainer />
    </div>
  );
};

export default Home;
