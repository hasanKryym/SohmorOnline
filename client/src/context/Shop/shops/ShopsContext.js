import { createContext, useContext, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import { notificationTypes } from "../../Notification/notificationEnum";
import { edit_shop, getShops } from "../../../services/shopService";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shops, setShops] = useState([]);
  const { showNotification, hideNotification } = useNotification();

  const updateShops = (newShopData) => {
    setShops(newShopData);
  };

  const get_shops = async (shopId) => {
    showNotification(notificationTypes.LOAD, "");
    const response = await getShops(shopId);
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

  const editShop = async (shopData) => {
    showNotification(notificationTypes.LOAD, "");
    const response = await edit_shop(shopData);
    if (response.success) {
      console.log(response);
      setShops([response.shop]);
      showNotification(notificationTypes.SUCCESS, response.message);
    } else
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while editing shop"
      );
  };

  return (
    <ShopContext.Provider value={{ shops, updateShops, get_shops, editShop }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  return useContext(ShopContext);
};
