import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={styles["input-group"]}>
      <label htmlFor={props.id}>
        {props.label} <span>{props.errorMessage}</span>
      </label>
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        ref={props.ref}
        onBlur={props.onBlur}
        style={props.style}
        required
      />
    </div>
  );
};

export default Input;
