import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../Notification/NotificationContext";
import { notificationTypes } from "../Notification/notificationEnum";
import { editUser, editUserFav } from "../../services/userService";
import { addOrder, getOrders, updateOrder } from "../../services/ordersService";
import { useNavigate } from "react-router-dom";
import UserPositions from "../../enum/userEnum/userPositionsEnum";
import { orderStatus } from "../../enum/OrderStatuses/orderstatuses";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
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

  const [favorites, setFavorites] = useState({
    shops: [],
    products: [],
  });

  const [orders, setOrders] = useState([]);
  const [ordersParams, setOrdersParams] = useState({
    status: orderStatus.PENDING,
  });

  useEffect(() => {
    // Update localStorage whenever user state changes
    localStorage.setItem("user", JSON.stringify(user.data));
  }, [user]);

  useEffect(() => {
    if (isLoggedIn()) {
      getUserOrders();
    }
  }, [ordersParams]);

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

  useEffect(() => {
    if (isLoggedIn() && user.data.role.position === UserPositions.USER)
      editFav();
  }, [user.data.fav]);

  const editFav = async () => {
    showNotification(notificationTypes.LOAD, "");
    const response = await editUserFav(user.data.fav);
    if (response.success) {
      const newUser = response?.user;
      // setUser({
      //   ...user,
      //   data: {
      //     ...user.data,
      //     fav: newUser.fav,
      //   },
      // });
      setFavorites(newUser.fav);
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
      return;
    }
    showNotification(notificationTypes.LOAD, "");

    const response = await addOrder(user.data.cart);

    if (response.success) {
      showNotification(notificationTypes.SUCCESS, response.message);
      getUserOrders();
      return response;
    } else showNotification(notificationTypes.ERROR, response.message);
  };

  const getUserOrders = async () => {
    showNotification(notificationTypes.LOAD, "");
    const response = await getOrders(ordersParams);

    if (response.success) {
      setOrders(response.orders);
      hideNotification();
      return response;
    } else showNotification(notificationTypes.ERROR, response.message);
  };

  const updateOrderStatus = async (orderId, updatedOrder) => {
    showNotification(notificationTypes.LOAD, "");
    const response = await updateOrder(orderId, updatedOrder);
    if (response.success) {
      const updatedOrders = orders.filter((order) => {
        return order._id !== orderId;
      });

      setOrders(updatedOrders);
      showNotification(notificationTypes.SUCCESS, response.message);
    } else showNotification(notificationTypes.ERROR, response.message);
  };

  const logout = () => {
    localStorage.clear();
    setUser({
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

    navigate("/");
    window.location.reload();
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
        favorites,
        orders,
        getUserOrders,
        ordersParams,
        setOrdersParams,
        updateOrderStatus,
        logout,
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
