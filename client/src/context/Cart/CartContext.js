import React, { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../Notification/NotificationContext";
import { notificationTypes } from "../Notification/notificationEnum";
import { updateUserCart } from "../../services/userService";
import { useUser } from "../User/UserContext";

// Create the context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const { showNotification } = useNotification();
  const { user } = useUser();

  const [cartItems, setCartItems] = useState(user?.data?.cart ?? []);

  useEffect(() => {
    if (cartItems !== user?.data?.cart) updateCart(cartItems);
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const updateCart = async () => {
    showNotification(notificationTypes.LOAD, "");
    const response = await updateUserCart(cartItems);
    if (response.success) {
      showNotification(notificationTypes.SUCCESS, response.message);
    } else showNotification(notificationTypes.ERROR, response.message);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
