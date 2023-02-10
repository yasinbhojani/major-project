import styles from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      className={`${styles.defaultBtn} ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.text}
    </button>
  );
};
export default Button;
