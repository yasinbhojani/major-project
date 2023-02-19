import styles from "./NavBar.module.css";
import logo from "../../assets/shell-logo.png";
import NavButtons from "./NavButtons";

import home from "./icon/home.svg";
import news from "./icon/news.svg";
import chats from "./icon/message.svg";
import profile from "./icon/profile.svg";
import more from "./icon/more.svg";
import Button from "../UI/Button/Button";
import NavButton from "./NavButton";

const NavBar = (props) => {
  return (
    <>
      <nav className={styles.NavBar}>
        <a href="/">
          <button className={styles.NavBarLogo}>
            <img src={logo} alt="logo" />
          </button>
        </a>
        <NavButtons path="/" iconSource={home} page="Home" />
        <NavButtons path="/news" iconSource={news} page="News" />
        <NavButtons path="/chats" iconSource={chats} page="Chats" />
        <NavButtons path="/profile" iconSource={profile} page="Profile" />
        <NavButton path="/more" iconSource={more} page="More" />
        <Button text="New Pearl" />
      </nav>
    </>
  );
};
export default NavBar;
