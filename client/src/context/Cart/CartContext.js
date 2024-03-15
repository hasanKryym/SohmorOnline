import React, { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../Notification/NotificationContext";
import { notificationTypes } from "../Notification/notificationEnum";
import { updateUserCart } from "../../services/userService";
import { useUser } from "../User/UserContext";
import { useProduct } from "../Shop/Products/ProductsContext";

// Create the context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const { showNotification } = useNotification();
  const { user } = useUser();
  const { getProductsById } = useProduct();

  const [cartItems, setCartItems] = useState(user?.data?.cart ?? []);

  const [cartProductsDetails, setCartProductsDetails] = useState([]);

  useEffect(() => {
    if (cartItems !== user?.data?.cart) {
      updateCart(cartItems);
    }
    getProductsDetails();
  }, [cartItems]);

  //   useEffect(() => {
  //     if (cartItems.length !== 0 || cartProductsDetails.length !== 0)
  //       getProductsDetails();
  //   }, []);

  const getProductsDetails = async () => {
    const productsIds = cartItems.map(({ product }) => {
      return product;
    });
    const response = await getProductsById(productsIds);

    // response.products.map((product) => {
    //   cartItems.map((item) => {
    //     if (product._id === item.product) product.quantity = item.quantity;
    //   });
    // });

    // Create a hash map of cart items for efficient lookup
    const cartItemMap = {};
    cartItems.forEach((item) => {
      cartItemMap[item.product] = item.quantity;
    });

    // Update products in response with quantities from the cart
    response.products.forEach((product) => {
      const quantity = cartItemMap[product._id];
      if (quantity !== undefined) {
        product.quantity = quantity;
      }
    });

    setCartProductsDetails(response.products);
  };

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
        cartProductsDetails,
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
