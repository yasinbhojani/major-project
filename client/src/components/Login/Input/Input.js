import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={styles["input-group"]}>
      <label htmlFor={props.id}>{props.label}</label>
      <input type={props.type} id={props.id} placeholder={props.placeholder} />
    </div>
  );
};

export default Input;
