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
import { CiCircleRemove } from "react-icons/ci";

const Notification = () => {
  const { notifications, removeNotification, showLoader } = useNotification();
  let message = "";
  let type = "";
  let icon = null;

  return (
    <>
      <div className="notification-container">
        {notifications.map((notification) => {
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
            <div
              key={notification.id}
              className={`notification ${notification.type}`}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <span className="notification-icon">{icon}</span>
                <p>{notification.message}</p>
              </div>

              <button onClick={() => removeNotification(notification.id)}>
                {/* Dismiss */}
                <CiCircleRemove className="dismiss_notification-button" />
              </button>
            </div>
          );
        })}
      </div>

      {showLoader && <Loader showOverlay={true} />}
    </>
  );
};

export default Notification;
