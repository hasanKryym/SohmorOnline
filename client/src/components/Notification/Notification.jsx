import { useState } from "react";
import { useNotification } from "../../context/Notification/NotificationContext";
import "./Notification.css";
import { notificationTypes } from "../../context/Notification/notificationEnum";
import Loader from "../LoaderOverlay/Loader";

const Notification = () => {
  const { notification } = useNotification();
  //   const [notificatioinObj, setNotificationObj] = useState({
  //     message: "",
  //     type: "",
  //   });
  //   const { message, type } = notificatioinObj;
  let message = "";
  let type = "";
  if (notification) {
    // const { message, type } = notification;
    // setNotificationObj({ message, type });
    message = notification.message;
    type = notification.type;
  }

  return (
    <>
      {notification && <div className={`notification ${type}`}>{message}</div>}
      {notification && type === notificationTypes.LOAD && (
        <Loader showOverlay={true} />
      )}
    </>
  );
};

export default Notification;
