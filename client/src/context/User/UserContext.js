import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../Notification/NotificationContext";
import { notificationTypes } from "../Notification/notificationEnum";
import { editUser } from "../../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
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

  const editUserData = async (userData) => {
    if (
      userData.name === user.data.name &&
      userData.address === user.data.address &&
      userData.number === user.data.number
    )
      return;
    showNotification(notificationTypes.LOAD, "");

    const response = await editUser(userData);

    if (response.success) {
      // setUser(response?.newUserData);
      const newUser = response?.newUserData;
      setUser({
        ...user,
        data: {
          ...user.data,
          name: newUser.name,
          address: newUser.address,
          number: newUser.number,
        },
      });
      showNotification(notificationTypes.SUCCESS, "Data updated successfully");
    } else showNotification(notificationTypes.ERROR, response.message);
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
      value={{ user, setUser, editUserData, isLoggedIn, showLoginNotification }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};
