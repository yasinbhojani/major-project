import styles from "./Greets.module.css";
import Button from "../../../components/UI/Button/Button";
import pie from "../../../assets/Dashboard/Analytics/pie.svg";
const Greets = (props) => {
  return (
    <div className={styles.greets}>
      <div>
        <h1>Welcome back!</h1>
        <p>Hello, {props.name}</p>
        <p>
          I hope you are doing well today. Here are latest stats for you to
          analysis and to take further decision.
        </p>
        <a href="#overview">
          <Button text="Explore Now" />
        </a>
      </div>
      <img src={pie} alt="" />
    </div>
  );
};
export default Greets;
