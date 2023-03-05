import React from "react";

const ModalContext = React.createContext({
  modalIsVisible: false,
  setModalIsVisible: () => {},
})

export default ModalContext;