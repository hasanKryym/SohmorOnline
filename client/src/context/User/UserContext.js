import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../Notification/NotificationContext";
import { notificationTypes } from "../Notification/notificationEnum";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // The error is that in the localStorage the userObject is not being updated so the cart returns back to its initial state on refresh
  // I have to figure a way to update to localStarage user object when the user data changes
  const [user, setUser] = useState({
    status: {
      isLoggedIn: localStorage.getItem("token") ? true : false,
      token: localStorage.getItem("token"),
    },
    data: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : {
          _id: "",
          name: "",
          email: "",
          address: "",
          number: "",
          role: {
            position: "user",
            shop: null,
          },
          cart: [],
        },
  });

  useEffect(() => {
    // Update localStorage whenever user state changes
    localStorage.setItem("user", JSON.stringify(user.data));
  }, [user]);

  const { showNotification } = useNotification();

  const isLoggedIn = () => {
    return user.status.isLoggedIn;
  };

  const showLoginNotification = () => {
    showNotification(
      notificationTypes.INFO,
      "Please login to access this feature"
    );
  };

  // Function to update user data
  // const updateUserData = (newUserData) => {
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     data: {
  //       ...prevUser.data,
  //       ...newUserData,
  //     },
  //   }));
  // };

  // useEffect(() => {
  //   updateUserData(JSON.parse(localStorage.getItem("user")));
  // }, [user.status.isLoggedIn]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, showLoginNotification }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};
