import Open from "../../assets/Settings/Open.svg";
import User from "../../assets/Settings/User.svg";
import Edit from "../../assets/Settings/Edit.svg";
import Notification from "../../assets/Settings/Notification.svg";
// import Delet from "../../assets/Settings/Delet.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Options.module.css";
import jwt_decode from "jwt-decode";

import ChangePassword from "./ChangePassword/ChangePassword";
import NotificationOnOff from "./Notification/NotificationOnOff";
// import DeleteAcc from "./DeleteAcc/DeleteAcc";

import backButton from "../../assets/Profile/backButton.svg";

const Options = (props) => {
  const redirect = useNavigate();
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  const changepasswordHandler = () => {
    setCurrentPage("Change your password");
    setPage(<ChangePassword />);
  };
  const notificationOnOffHandler = () => {
    setCurrentPage("Notifications");
    setPage(<NotificationOnOff />);
  };
  // const deactivateAccHandler = () => {
  //   setCurrentPage("Delete Account");
  //   setPage(<DeleteAcc />);
  // };
  let opetions = (
    <>
      <div
        className={styles.opetions}
        onClick={() => redirect(`/profile/update/${decodedToken.user_id}`)}
      >
        <img src={User} alt="" className={styles.icon} />
        <div className={styles.opetionInfo}>
          <h1>Account information</h1>
          <p>
            Update your account information like your phone number and email
            address
          </p>
        </div>
        <img src={Open} alt="" />
      </div>
      <div className={styles.opetions} onClick={changepasswordHandler}>
        <img src={Edit} alt="" className={styles.icon} />
        <div className={styles.opetionInfo}>
          <h1>Change password</h1>
          <p>Change your password at any time.</p>
        </div>
        <img src={Open} alt="" />
      </div>
      <div className={styles.opetions} onClick={notificationOnOffHandler}>
        <img src={Notification} alt="" className={styles.icon} />
        <div className={styles.opetionInfo}>
          <h1>Notifications</h1>
          <p>Turn Off/On Notifications</p>
        </div>
        <img src={Open} alt="" />
      </div>
      {/* <div className={styles.opetions} onClick={deactivateAccHandler}>
        <img src={Delet} alt="" className={styles.icon} />
        <div className={styles.opetionInfo}>
          <h1>Delete your account</h1>
          <p>Find out how you can delete your account</p>
        </div>
        <img src={Open} alt="" />
      </div> */}
    </>
  );
  const [page, setPage] = useState(opetions);
  const [currentPage, setCurrentPage] = useState("opetions");
  const resetPage = () => {
    setCurrentPage("opetions");
    setPage(opetions);
  };
  return (
    <>
      {currentPage !== "opetions" && (
        <div className={styles.backButton}>
          <img src={backButton} alt="" onClick={resetPage} />
          <h5>{currentPage}</h5>
        </div>
      )}
      {page}
    </>
  );
};
export default Options;
