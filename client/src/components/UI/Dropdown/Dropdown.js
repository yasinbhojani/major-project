import { useState, useEffect, useRef } from "react";
import NavButton from "../../NavBar/NavButton";
import styles from "./Dropdown.module.css";

const Dropdown = (props) => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const dropdownOpenHandler = () => {
    setMenuIsVisible((prevstate) => !prevstate);
  };

  return (
    <div ref={dropdownRef}>
      <NavButton
        iconSource={props.icon}
        page={props.text}
        onClick={dropdownOpenHandler}
      />
      {menuIsVisible && <div className={styles.dropdown}>{props.children}</div>}
    </div>
  );
};

export default Dropdown;
