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

import { createContext, useContext, useState } from "react";
import { notificationTypes } from "./notificationEnum";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const showNotification = (type, message) => {
    // Clear the previous timeout if exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setNotification({ type, message });

    // Set a new timeout to hide the notification
    const newTimeoutId = setTimeout(
      () => {
        hideNotification();
      },
      type === notificationTypes.WARNING ? 10000 : 4000
    );

    // Save the timeout ID
    setTimeoutId(newTimeoutId);
  };

  const hideNotification = () => {
    setNotification(null);
    // Clear the timeout and reset the timeout ID
    clearTimeout(timeoutId);
    setTimeoutId(null);
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
