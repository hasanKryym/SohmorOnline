import { useState } from "react";
import { useNotification } from "../../context/Notification/NotificationContext";
import "./Notification.css";
import { notificationTypes } from "../../context/Notification/notificationEnum";
import Loader from "../LoaderOverlay/Loader";
import {
  AiOutlineInfoCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";

const Notification = () => {
  const { notification } = useNotification();
  let message = "";
  let type = "";
  let icon = null;

  if (notification) {
    message = notification.message;
    type = notification.type;

    // Assign icon based on notification type
    switch (type) {
      case notificationTypes.INFO:
        icon = <AiOutlineInfoCircle />;
        break;
      case notificationTypes.WARNING:
        icon = <AiOutlineWarning />;
        break;
      case notificationTypes.ERROR:
        icon = <AiOutlineCloseCircle />;
        break;
      case notificationTypes.SUCCESS:
        icon = <AiOutlineCheckCircle />;
        break;
      default:
        break;
    }
  }

  return (
    <>
      {notification && (
        <div className={`notification ${type}`}>
          <span className="notification-icon">{icon}</span>
          <span className="notification-message">{message}</span>
        </div>
      )}
      {notification && type === notificationTypes.LOAD && (
        <Loader showOverlay={true} />
      )}
    </>
  );
};

export default Notification;
