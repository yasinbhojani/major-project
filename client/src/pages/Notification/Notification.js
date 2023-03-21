import styles from "./Notification.module.css";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Notification = () => {
  useEffect(() => {
    document.title = "Notifications / Shell";
  }, []);

  const redirect = useNavigate();
  const [notifications, setNotification] = useState([]);
  let decodedToken = null;
  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/notification/${decodedToken.user_id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        console.log(details);
        setNotification(details);
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });
  }, [decodedToken.user_id]);
  return (
    <div className={styles.notification}>
      <div className={styles.heading}>
        <h3>Notifications</h3>
      </div>
      <div>
        {notifications.map((notification) => {
          return (
            <div
              key={notification.notification_id}
              className={styles.notificationContent}
            >
              <img
                src={notification.avatar_url}
                alt=""
                onClick={() => {
                  redirect(`/profile/${notification.notification_from}`);
                }}
              />
              <div
                className={styles.notificationClick}
                onClick={() => {
                  if (
                    notification.content.includes(
                      "Messaged You For The First Time"
                    )
                  ) {
                    redirect(
                      `/chats/private/${decodedToken.user_id}/${notification.notification_from}`
                    );
                  }
                }}
              >
                <p>
                  <b>{notification.username}</b> <br /> {notification.content}
                </p>
                <p>{notification.sent_date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Notification;
