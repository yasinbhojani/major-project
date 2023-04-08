import { NavLink } from "react-router-dom";
import styles from "./DNavBar.module.css";
const DNavLinks = (props) => {
  return (
    <>
      <NavLink to={props.path} className={styles.navBarLink} end>
        {/* <img src={props.iconSource} alt="homeIcon" /> */}
        <span> {props.page} </span>
      </NavLink>
    </>
  );
};
export default DNavLinks;
