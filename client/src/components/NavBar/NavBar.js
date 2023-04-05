import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import settings from "./icon/settings.svg";
import info from "./icon/about.svg";
import logout from "./icon/signout.svg";

import jwt_decode from "jwt-decode";
import Dropdown from "../UI/Dropdown/Dropdown";
import DropdownOption from "../UI/Dropdown/DropdownOption";
import Button from "../UI/Button/Button";
import NewPearl from "../Pearls/NewPearls/NewPearl";
import AccountData from "./AccountData/AccountData";

const NavBar = (props) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const navigate = useNavigate();
  let decodedToken;

  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }

  const logoutHandler = () => {
    if (decodedToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("is_admin");
      navigate("/auth/login");
    }
  };

  const newPearlHandler = () => {
    setModalIsVisible(true);
  };

  return (
    <>
      <nav className={styles.NavBar}>
        <div>
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
          {decodedToken && (
            <NavButtons
              path={`/profile/${decodedToken.user_id}`}
              iconSource={profile}
              page="Profile"
            />
          )}
          <Dropdown text="More" icon={more}>
            <DropdownOption
              icon={settings}
              text="Settings"
              onClick={() => navigate("/settings")}
            />
            <DropdownOption
              icon={info}
              text="About"
              onClick={() => navigate("/about")}
            />
            <DropdownOption
              icon={logout}
              text="Logout"
              onClick={logoutHandler}
            />
          </Dropdown>
          <Button text="New Pearl" onClick={newPearlHandler} />
        </div>
        <AccountData />
      </nav>
      {modalIsVisible && (
        <NewPearl
          onClose={() => {
            setModalIsVisible(false);
          }}
        />
      )}
    </>
  );
};
export default NavBar;
