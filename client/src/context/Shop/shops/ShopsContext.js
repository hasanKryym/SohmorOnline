import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import { notificationTypes } from "../../Notification/notificationEnum";
import {
  addShopRegistrationRequest,
  add_shop,
  changeRequestStatus,
  delete_shop,
  edit_shop,
  getRegistrationRequests,
  getShops,
  get_Domains,
} from "../../../services/shopService";
import { register } from "../../../services/userService";
import { useUser } from "../../User/UserContext";
import { useLocation } from "react-router-dom";
import UserPositions from "../../../enum/userEnum/userPositionsEnum";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const location = useLocation();

  const [shops, setShops] = useState([]);
  const [shop, setShop] = useState({});
  const [isFav, setIsFav] = useState(false);
  const [shopQueryParams, setShopQueryParams] = useState({});
  const [shopsDomains, setShopsDomains] = useState([]);
  const [shopRegistrationRequests, setShopRegistrationRequests] = useState([]);
  const { addNotification, load, hideLoader } = useNotification();
  const { user } = useUser();

  const updateShops = (newShopData) => {
    setShops(newShopData);
  };

  useEffect(() => {
    if (
      user.data.role.position === UserPositions.SHOP_ADMIN &&
      !shopQueryParams.shopId
    )
      return;
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
    let all = false;
    load();
    if (
      location.pathname === "/siteAdmin/adminPanel/dashboard" ||
      location.pathname === "/shops/adminPanel/dashboard"
    )
      all = true;
    const response = await getShops(shopQueryParams, all);
    if (response.success) {
      if (shopQueryParams.shopId) {
        setShop(response.shops[0]);
        hideLoader();
        return;
      }
      updateShops(response.shops);
      hideLoader();
      return response;
    } else {
      addNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while retrieving shops"
      );
    }
  };

  const addShop = async (shopData, adminData) => {
    load();
    const response = await add_shop(shopData);
    if (response.success) {
      const shop = response.shop;
      adminData.role.shop = shop._id;
      const res = await register(adminData);
      if (res.success) {
        addNotification(notificationTypes.SUCCESS, response.message);
        return response;
      } else {
        addNotification(
          notificationTypes.ERROR,
          response.message ? response.message : "error while adding admin"
        );
      }
    } else {
      addNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while adding the shop"
      );
      return response;
    }
  };

  const editShop = async (shopData) => {
    load();
    const response = await edit_shop(shopData);
    if (response.success) {
      setShop(response.shop);
      addNotification(notificationTypes.SUCCESS, response.message);
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while editing shop"
      );
  };

  const deleteShop = async (shopId) => {
    load();
    const response = await delete_shop(shopId);
    if (response.success) {
      addNotification(
        notificationTypes.SUCCESS,
        response.message ? response.message : "shop deleted successfully"
      );
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while deleting shop"
      );
  };

  const addRegistrationRequest = async (requestData) => {
    load();
    const response = await addShopRegistrationRequest(requestData);
    if (response.success) {
      addNotification(notificationTypes.SUCCESS, response.message);
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message ?? "error while adding registration request"
      );
    return response;
  };

  const changeShopRegistrationRequestStatus = async (requestId, newStatus) => {
    load();
    const response = await changeRequestStatus(requestId, newStatus);
    if (response.success) {
      addNotification(notificationTypes.SUCCESS, response.message);
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message ?? "error while changing registration request status"
      );
  };

  const getShopRegistrationRequests = async (status) => {
    load();
    const response = await getRegistrationRequests(status);
    console.log(response);
    if (response.success) {
      setShopRegistrationRequests(response.requests);
      hideLoader();
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message ?? "error while changing registration request status"
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
        addRegistrationRequest,
        changeShopRegistrationRequestStatus,
        shopRegistrationRequests,
        getShopRegistrationRequests,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  return useContext(ShopContext);
};
