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
  const { user, setUser } = useUser();
  const { getProductsById } = useProduct();

  const [cartItems, setCartItems] = useState(user?.data?.cart ?? []);

  const [cartProductsDetails, setCartProductsDetails] = useState([]);

  useEffect(() => {
    if (cartItems !== user?.data?.cart) {
      updateCart(cartItems);
    }
    if (cartItems.length !== 0) getProductsDetails();
  }, [cartItems]);

  useEffect(() => {
    setCartItems(user.data.cart);
  }, [user.data.cart]);

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
      // cartItemMap[item.product] = item.quantity;
      const quantity = item.quantity;
      const shop = item.shop;
      cartItemMap[item.product] = { quantity, shop };
    });

    // Update products in response with quantities from the cart
    response.products.forEach((product) => {
      const quantity = cartItemMap[product._id].quantity;
      const shop = cartItemMap[product._id].shop;
      if (quantity !== undefined) {
        product.quantity = quantity;
      }

      if (shop !== undefined) {
        product.shop = shop;
      }
    });

    setCartProductsDetails(response.products);
  };

  const addToCart = (item) => {
    let flag = true;
    cartItems.map((cartItem) => {
      if (cartItem.product === item.product) flag = false;
    });
    if (flag) setCartItems((prevItems) => [...prevItems, item]);
    else
      showNotification(
        notificationTypes.INFO,
        "product is already present in the cart"
      );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product !== itemId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCartProductsDetails([]);
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
      setUser((prevUser) => ({
        ...prevUser,
        data: {
          ...prevUser.data,
          cart: response.updatedCart,
        },
      }));
      showNotification(notificationTypes.SUCCESS, response.message);
    } else showNotification(notificationTypes.ERROR, response.message);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartProductsDetails,
        setCartProductsDetails,
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
