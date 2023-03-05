import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";

import ModalContext from "../../../context/modal-context";
import styles from "./Modal.module.css";
import close from "../../../assets/close.svg";

const Modal = (props) => {
  const modalCtx = useContext(ModalContext);
  const { modalIsVisible } = modalCtx;

  const modalCloseHandler = () => {
    modalCtx.setModalIsVisible(false);
  };

  useEffect(() => {
    modalIsVisible && (document.body.style.overflow = "hidden");
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalIsVisible]);

  return (
    modalIsVisible &&
    ReactDOM.createPortal(
      <div className={styles.backdrop}>
        <div className={styles.overlay}>
          <div className={styles.closediv}>
            <img
              src={close}
              onClick={modalCloseHandler}
              alt="close button"
            ></img>
          </div>
          {props.children}
        </div>
      </div>,
      document.getElementById("modal")
    )
  );
};

export default Modal;
