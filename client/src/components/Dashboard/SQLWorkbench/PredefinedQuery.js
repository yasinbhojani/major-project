import styles from "./PredefinedQuery.module.css";
const PredefinedQuery = (props) => {
  return (
    <button className={styles.queryBtns} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
export default PredefinedQuery;
