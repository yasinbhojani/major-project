// import styles from "./Notification.module.css"
import { useEffect } from "react";

const Notification = () => {
  useEffect(() => {
    document.title = "Notifications / Shell";
  }, []);

  return (
    <>
      <h1>Notifications Page</h1>
    </>
  );
};
export default Notification;
