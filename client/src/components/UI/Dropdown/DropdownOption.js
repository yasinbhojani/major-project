import React from "react";

import styles from "./Dropdown.module.css";

const DropdownOption = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <img src={props.icon} alt="more button" />
      <span> {props.text} </span>
    </button>
  );
};

export default DropdownOption;
