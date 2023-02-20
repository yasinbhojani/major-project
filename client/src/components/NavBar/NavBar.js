import styles from "./NavBar.module.css";
import logo from "../../assets/shell-logo.png";
import NavButtons from "./NavButtons";

import home from "./icon/home.svg";
import search from "./icon/search.svg";
import news from "./icon/news.svg";
import chats from "./icon/message.svg";
import notification from "./icon/notification.svg";
import profile from "./icon/profile.svg";
import more from "./icon/more.svg";
import Button from "../UI/Button/Button";
import NavButton from "./NavButton";

import jwt_decode from "jwt-decode";

const NavBar = (props) => {
  let decodedToken;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  return (
    <>
      <nav className={styles.NavBar}>
        <a href="/">
          <button className={styles.NavBarLogo}>
            <img src={logo} alt="logo" />
          </button>
        </a>
        <NavButtons path="/" iconSource={home} page="Home" />
        <NavButtons path="/search" iconSource={search} page="Search" />
        <NavButtons path="/news" iconSource={news} page="News" />
        <NavButtons path="/chats" iconSource={chats} page="Chats" />
        <NavButtons
          path="/notification"
          iconSource={notification}
          page="Notifications"
        />
        <NavButtons
          path={`/profile/${decodedToken.user_id}`}
          iconSource={profile}
          page="Profile"
        />
        <NavButton path="/more" iconSource={more} page="More" />
        <Button text="New Pearl" />
      </nav>
    </>
  );
};
export default NavBar;
