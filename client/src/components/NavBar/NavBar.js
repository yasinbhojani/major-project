import styles from "./NavBar.module.css";
import logo from "../../assets/shell-logo.png";
import NavButtons from "./NavButtons";

import home from "./icon/home.png";
import news from "./icon/news.png";
import chats from "./icon/chat.png";
import profile from "./icon/profile.png";
import Button from "../UI/Button/Button";

const NavBar = (props) => {
  return (
    <>
      <nav className={styles.NavBar}>
        <a href="/">
          <button className={styles.NavBarLogo}>
            <img src={logo} alt="logo" />
          </button>
        </a>
        <NavButtons path="/" iconSource={home} page="home" />
        <NavButtons path="/news" iconSource={news} page="News" />
        <NavButtons path="/chats" iconSource={chats} page="Chats" />
        <NavButtons path="/profile" iconSource={profile} page="Profile" />
        <Button text="New Pearl" />
      </nav>
    </>
  );
};
export default NavBar;
