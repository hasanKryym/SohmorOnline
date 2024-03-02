import { createContext, useContext, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import { getProducts } from "../../../services/productService";
import { notificationTypes } from "../../Notification/notificationEnum";

// Create the context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const { showNotification, hideNotification } = useNotification();
  const [products, setProducts] = useState([]);

  const getShopProducts = async (queryParameter) => {
    if (!queryParameter.shopId) {
      showNotification(notificationTypes.INFO);
      return;
    }
    showNotification(notificationTypes.LOAD, "");
    const response = await getProducts(queryParameter);
    if (response.success) {
      setProducts(response.products);
      hideNotification();
    } else
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while retrieving products"
      );
  };

  return (
    <ProductContext.Provider value={{ products, getShopProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Create a hook to use the context
export const useProduct = () => {
  return useContext(ProductContext);
};
