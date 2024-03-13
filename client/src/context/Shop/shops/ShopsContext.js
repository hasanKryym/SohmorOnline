import { createContext, useContext, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import { notificationTypes } from "../../Notification/notificationEnum";
import {
  add_shop,
  delete_shop,
  edit_shop,
  getShops,
} from "../../../services/shopService";
import { register } from "../../../services/userService";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shops, setShops] = useState([]);
  const [shop, setShop] = useState({});
  const { showNotification, hideNotification } = useNotification();

  const updateShops = (newShopData) => {
    setShops(newShopData);
  };

  const get_shops = async (shopId) => {
    showNotification(notificationTypes.LOAD, "");
    const response = await getShops(shopId);
    if (response.success) {
      if (shopId) {
        setShop(response.shops[0]);
        hideNotification();
        return;
      }
      updateShops(response.shops);
      hideNotification();
      return response;
    } else {
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while retrieving shops"
      );
    }
  };

  const addShop = async (shopData, adminData) => {
    showNotification(notificationTypes.LOAD, "");
    const response = await add_shop(shopData);
    if (response.success) {
      const shop = response.shop;
      adminData.role.shop = shop._id;
      const res = await register(adminData);
      if (res.success) {
        showNotification(notificationTypes.SUCCESS, response.message);
        return response;
      } else {
        showNotification(
          notificationTypes.ERROR,
          response.message ? response.message : "error while adding admin"
        );
      }
    } else {
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while adding the shop"
      );
      return response;
    }
  };

  const editShop = async (shopData) => {
    showNotification(notificationTypes.LOAD, "");
    const response = await edit_shop(shopData);
    if (response.success) {
      setShop(response.shop);
      showNotification(notificationTypes.SUCCESS, response.message);
    } else
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while editing shop"
      );
  };

  const deleteShop = async (shopId) => {
    showNotification(notificationTypes.LOAD, "");
    const response = await delete_shop(shopId);
    if (response.success) {
      showNotification(
        notificationTypes.SUCCESS,
        response.message ? response.message : "shop deleted successfully"
      );
    } else
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while deleting shop"
      );
  };

  return (
    <ShopContext.Provider
      value={{
        shops,
        shop,
        setShop,
        updateShops,
        get_shops,
        editShop,
        addShop,
        deleteShop,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  return useContext(ShopContext);
};
