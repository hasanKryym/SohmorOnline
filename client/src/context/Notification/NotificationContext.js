import { createContext, useContext, useState } from "react";
import { notificationTypes } from "./notificationEnum";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    if (type !== notificationTypes.LOAD) {
      if (type === notificationTypes.WARNING)
        setTimeout(() => {
          hideNotification();
        }, 10000);
      else
        setTimeout(() => {
          hideNotification();
        }, 4000);
    }
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
