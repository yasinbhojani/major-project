import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";
import close from "../../../assets/close.svg";

const Modal = (props) => {
  const modalCloseHandler = () => {
    props.onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={styles.overlay}>
            <div className={styles.closediv}>
              <h3>{props.title}</h3>
              <img
                src={close}
                onClick={modalCloseHandler}
                alt="close button"
              ></img>
            </div>
            <hr />
            <div className={styles.content}>{props.children}</div>
          </div>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
