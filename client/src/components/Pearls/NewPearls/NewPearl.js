import React from "react";
import Modal from "../../UI/Modal/Modal";

import styles from "./NewPearl.module.css";

const NewPearl = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <form className={styles.form}>
        <textarea
          className={styles.textarea}
          contentEditable="true"
          placeholder="Share your thoughts"
        ></textarea>
      </form>
    </Modal>
  );
};

export default NewPearl;
