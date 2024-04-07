import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../Notification/NotificationContext";
import { notificationTypes } from "../Notification/notificationEnum";
import { editUser, editUserFav } from "../../services/userService";
import { addOrder } from "../../services/ordersService";

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
          fav: {
            shops: [],
            products: [],
          },
        },
  });

  const { showNotification, hideNotification } = useNotification();

  useEffect(() => {
    // Update localStorage whenever user state changes
    localStorage.setItem("user", JSON.stringify(user.data));
  }, [user]);

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

  const editFav = async (newFavorites) => {
    if (!newFavorites) return;
    showNotification(notificationTypes.LOAD, "");
    const response = await editUserFav(newFavorites);
    if (response.success) {
      const newUser = response?.user;
      setUser({
        ...user,
        data: {
          ...user.data,
          fav: newUser.fav,
        },
      });
      // showNotification(notificationTypes.SUCCESS, response.message);
      hideNotification();
    } else showNotification(notificationTypes.ERROR, response.message);
  };

  const createOrder = async () => {
    if (user.data.cart.length === 0) {
      showNotification(
        notificationTypes.INFO,
        "Please insert products to your cart first"
      );
    }
    showNotification(notificationTypes.LOAD, "");
    const response = await addOrder(user.data.cart);

    if (response.success) {
      console.log(response.order);
      showNotification(notificationTypes.SUCCESS, response.message);
    } else showNotification(notificationTypes.ERROR, response.message);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        editUserData,
        isLoggedIn,
        showLoginNotification,
        editFav,
        createOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};
