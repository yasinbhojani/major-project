import { useEffect } from "react";
import styles from "./Settings.module.css";
import Options from "../../components/Settings/Options";
const Settings = (props) => {
  useEffect(() => {
    document.title = "Settings / Shell";
  }, []);

  return (
    <div className={styles.Settings}>
      <div className={styles.heading}>
        <h3>Settings</h3>
      </div>
      {/* <div className={styles.settingNav}>
        <h5>Your Account</h5>
        <p>
          See information about your account, or learn about your account
          deletion options
        </p>
      </div> */}
      <Options />
    </div>
  );
};
export default Settings;
