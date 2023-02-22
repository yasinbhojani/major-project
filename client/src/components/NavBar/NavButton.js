import styles from "./NavBar.module.css";

const NavButton = (props) => {
  return (
    <button className={styles.navBarLink} onClick={props.onClick}>
      <img src={props.iconSource} alt="more button" />
      <span> {props.page} </span>
    </button>
  );
};

export default NavButton;
