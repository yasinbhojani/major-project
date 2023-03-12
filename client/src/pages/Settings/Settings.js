import styles from "./Settings.module.css";
import Opetions from "../../components/Settings/Opetions";
const Settings = (props) => {
  return (
    <div className={styles.Settings}>
      <div className={styles.backBtn}>
        <h3>Settings</h3>
      </div>
      <div className={styles.settingNav}>
        <h5>Your Account</h5>
        <p>
          See information about your account, or learn about your account
          deactivation options
        </p>
      </div>
      <Opetions />
    </div>
  );
};
export default Settings;
