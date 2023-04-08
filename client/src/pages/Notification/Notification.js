import styles from "./Notification.module.css";

import jwt_decode from "jwt-decode";

import ReactTimeAgo from "react-time-ago";

import nonotifications from "../../assets/Notifications/nonotifications.svg";
import off from "../../assets/Notifications/off.svg";

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

  // This useEffect will retrive all Notifications of user
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/notification/${decodedToken.user_id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        setNotification(details);
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });
  }, [decodedToken.user_id]);

  // HTML Here
  return (
    <div className={styles.notification}>
      {localStorage.getItem("notifications") === "true" ? (
        <>
          <div className={styles.heading}>
            <h3>Notifications</h3>
          </div>
          <div>
            {notifications.length === 0 && (
              <div className={styles.noNotifications}>
                <img src={nonotifications} alt="" />
                <div>
                  <h3>No Notifications</h3>
                  <p>
                    There are no notifications available at the moment.
                    <br />
                    Please try again later.
                  </p>
                </div>
              </div>
            )}
            {notifications.map((notification) => {
              const date = new Date(notification.sent_date);
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
                      <b>@{notification.notification_from}</b>{" "}
                      {notification.content}
                    </p>
                    <p>
                      <ReactTimeAgo
                        date={date} //This date is asking for number but sent_date is in string so there is error printing in console
                        locale="en-IN"
                        timeStyle="twitter"
                        className={styles.time}
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className={styles.hidden}>
            <img src={off} alt="Not found vector" />
            <div>
              <h3>Notifications Are Not Available</h3>
              <p>
                The notifications are disabled at the moment.
                <br />
                Please try again later.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Notification;
