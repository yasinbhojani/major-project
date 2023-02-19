import styles from "./NavBar.module.css";

const NavButton = (props) => {
  return (
    <button className={styles.navBarLink}>
      <img src={props.iconSource} alt="more button" />
      <span> {props.page} </span>
    </button>
  );
};

export default NavButton;
