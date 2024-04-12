import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import { notificationTypes } from "../../Notification/notificationEnum";
import {
  add_shop,
  delete_shop,
  edit_shop,
  getShops,
  get_Domains,
} from "../../../services/shopService";
import { register } from "../../../services/userService";
import { useUser } from "../../User/UserContext";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shops, setShops] = useState([]);
  const [shop, setShop] = useState({});
  const [isFav, setIsFav] = useState(false);
  const [shopQueryParams, setShopQueryParams] = useState({});
  const [shopsDomains, setShopsDomains] = useState([]);
  const { showNotification, hideNotification } = useNotification();
  const { user } = useUser();

  const updateShops = (newShopData) => {
    setShops(newShopData);
  };

  useEffect(() => {
    get_shops();
  }, [shopQueryParams]);

  const getDomains = async () => {
    const response = await get_Domains();
    if (response.success) {
      setShopsDomains(response.domains);
    }
  };

  useEffect(() => {
    getDomains();
  }, []);

  useEffect(() => {
    if (!shop._id) {
      setIsFav(false);
      return;
    }

    user.data.fav.shops.forEach((_id) => {
      if (_id === shop._id) {
        setIsFav(true);
        return;
      }
    });
  }, [shop]);

  const get_shops = async () => {
    showNotification(notificationTypes.LOAD, "");
    const response = await getShops(shopQueryParams);
    if (response.success) {
      if (shopQueryParams.shopId) {
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
        shopQueryParams,
        setShopQueryParams,
        shopsDomains,
        updateShops,
        get_shops,
        editShop,
        addShop,
        deleteShop,
        isFav,
        setIsFav,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  return useContext(ShopContext);
};
