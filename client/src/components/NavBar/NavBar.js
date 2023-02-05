import styles from "./NavBar.module.css";
import logo from "../../assets/shell-logo.png";
import home from "./icon/home.png";
import news from "./icon/news.png";
import chats from "./icon/chat.png";
import profile from "./icon/profile.png";
import { NavLink } from "react-router-dom";
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
          <NavLink to="/" className={styles.navBarLink}>
            <button className={styles.NavBtn}>
              <img src={home} alt="homeIcon" /> Home
            </button>
          </NavLink>
          <NavLink to="/news" className={styles.navBarLink}>
            <button className={styles.NavBtn}>
              <img src={news} alt="newsIcon" /> News
            </button>
          </NavLink>
          <NavLink to="/chats" className={styles.navBarLink}>
            <button className={styles.NavBtn}>
              <img src={chats} alt="chatsIcon" /> Chats
            </button>
          </NavLink>
          <NavLink to="/profile" className={styles.navBarLink}>
            <button className={styles.NavBtn}>
              <img src={profile} alt="profilIcon" /> Profile
            </button>
          </NavLink>
          <button className={styles.newPearl}>New Pearl</button>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
