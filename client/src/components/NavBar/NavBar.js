import styles from "./NavBar.module.css";
import logo from "../../assets/shell-logo.png";
import NavButtons from "./NavButtons";
const NavBar = (props) => {
  return (
    <>
      <nav className={styles.NavBarBody}>
        <div className={styles.NavBar}>
          <a href="/">
            <button className={styles.NavBarLogo}>
              <img src={logo} alt="logo" />
            </button>
          </a>
          <NavButtons />
          <button className={styles.newPearl}>New Pearl</button>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
