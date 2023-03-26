import "./Notification.css";
import styles from "./NotificationOnOff.module.css";
const NotificationOnOff = (props) => {
  console.log(localStorage.getItem("notifications"));
  return (
    <div className={styles.Notification}>
      <div className={styles.form}>
        <div className={styles.NotificationInfo}>
          <h3>Turn on / off notifications</h3>
          <p>
            If notifications are turned off new notification will be stored on
            our database, So once you turned on notification you can view your
            old notifications too : )
          </p>
        </div>
        <div className="checkbox-wrapper-22">
          <label className="switch" htmlFor="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              defaultChecked={
                localStorage.getItem("notifications") === "true" ? true : false
              }
              onChange={() => {
                localStorage.getItem("notifications") === "false"
                  ? localStorage.setItem("notifications", "true")
                  : localStorage.setItem("notifications", "false");
              }}
            />
            <div className="slider round"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
export default NotificationOnOff;
