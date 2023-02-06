import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
const NavButtons = (props) => {
  return (
    <>
      <NavLink to={props.path} className={styles.navBarLink}>
        <img src={props.iconSource} alt="homeIcon" />
        <span> {props.page} </span>
      </NavLink>
    </>
  );
};
export default NavButtons;
