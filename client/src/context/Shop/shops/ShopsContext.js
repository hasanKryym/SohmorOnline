import { createContext, useContext, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import { notificationTypes } from "../../Notification/notificationEnum";
import { getShops } from "../../../services/shopService";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shops, setShops] = useState([]);
  const { showNotification, hideNotification } = useNotification();

  const updateShops = (newShopData) => {
    setShops(newShopData);
  };

  const get_shops = async () => {
    showNotification(notificationTypes.LOAD, "");
    const response = await getShops();
    if (response.success) {
      updateShops(response.shops);
      hideNotification();
    } else {
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while retrieving shops"
      );
    }
  };

  return (
    <ShopContext.Provider value={{ shops, updateShops, get_shops }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  return useContext(ShopContext);
};
