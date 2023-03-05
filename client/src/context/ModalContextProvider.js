import React, { useState } from "react";
import ModalContext from "./modal-context";

const ModalContextProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        modalIsVisible: isVisible,
        setModalIsVisible: setIsVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
