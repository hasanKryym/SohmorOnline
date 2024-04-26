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
  const { notifications, removeNotification, showLoader } = useNotification();
  let message = "";
  let type = "";
  let icon = null;

  // if (notification) {
  //   message = notification.message;
  //   type = notification.type;

  //   // Assign icon based on notification type
  //   switch (type) {
  //     case notificationTypes.INFO:
  //       icon = <AiOutlineInfoCircle />;
  //       break;
  //     case notificationTypes.WARNING:
  //       icon = <AiOutlineWarning />;
  //       break;
  //     case notificationTypes.ERROR:
  //       icon = <AiOutlineCloseCircle />;
  //       break;
  //     case notificationTypes.SUCCESS:
  //       icon = <AiOutlineCheckCircle />;
  //       break;
  //     default:
  //       break;
  //   }
  // }

  return (
    <>
      {/* <div className={`notification ${type}`}>
        <span className="notification-icon">{icon}</span>
        <span className="notification-message">{message}</span>
        <button onClick={() => removeNotification(notification.id)}>
          Dismiss
        </button>
      </div> */}

      <div className="notification-container">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification ${notification.type}`}
          >
            <p>{notification.message}</p>
            <button onClick={() => removeNotification(notification.id)}>
              Dismiss
            </button>
          </div>
        ))}
      </div>

      {showLoader && <Loader showOverlay={true} />}
    </>
  );
};

export default Notification;
