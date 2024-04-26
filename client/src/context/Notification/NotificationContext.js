// import { createContext, useContext, useState } from "react";
// import { notificationTypes } from "./notificationEnum";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [notification, setNotification] = useState(null);

//   const showNotification = (type, message) => {
//     setNotification({ type, message });
//     if (type !== notificationTypes.LOAD) {
//       if (type === notificationTypes.WARNING)
//         setTimeout(() => {
//           hideNotification();
//         }, 10000);
//       else
//         setTimeout(() => {
//           hideNotification();
//         }, 4000);
//     }
//   };

//   const hideNotification = () => {
//     setNotification(null);
//   };

//   return (
//     <NotificationContext.Provider
//       value={{ notification, showNotification, hideNotification }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => {
//   return useContext(NotificationContext);
// };

import { createContext, useContext, useEffect, useState } from "react";
import { notificationTypes } from "./notificationEnum";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const notificationTimeouts = notifications.map((notification) => {
      return setTimeout(() => {
        removeNotification(notification.id);
      }, 3000);
    });

    return () => {
      notificationTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [notifications]);

  const addNotification = (type, message) => {
    const newNotification = { id: Date.now(), message, type };
    setNotifications([...notifications, newNotification]);
    hideLoader();
  };

  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const load = () => {
    setShowLoader(true);
  };
  const hideLoader = () => {
    setShowLoader(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        showLoader,
        load,
        hideLoader,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
