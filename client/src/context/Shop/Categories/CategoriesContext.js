import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import { notificationTypes } from "../../Notification/notificationEnum";
import {
  createShopCategory,
  editShopCategory,
  getShopCategories,
} from "../../../services/shopService";
import { useLocation } from "react-router-dom";
import { useShop } from "../shops/ShopsContext";
import { useUser } from "../../User/UserContext";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const location = useLocation();
  const { addNotification, load, hideLoader } = useNotification();
  const { setShopQueryParams } = useShop();
  const { user } = useUser();

  const [categories, setCategories] = useState([]);

  const updateCategories = (newCategories) => {
    setCategories(newCategories);
  };

  const getCategories = async (shopId) => {
    load();
    const response = await getShopCategories(shopId);

    if (response.success) {
      console.log(response);
      setCategories(response.categories);
      if (
        response.categories.length === 0 &&
        location.pathname === "/shops/adminPanel/dashboard"
      )
        addNotification(
          notificationTypes.WARNING,
          "please note that you will not be able to insert a product unless you add at least 1 category to the shop"
        );
      else hideLoader();
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message
          ? response.message
          : "error while retrieving categories"
      );

    return response;
  };

  const addNewCategory = async (name) => {
    if (!name) {
      addNotification(
        notificationTypes.INFO,
        "please provide a name for the category"
      );
      return;
    }
    load();
    const response = await createShopCategory(name);
    if (response.success) {
      setShopQueryParams((prevState) => ({
        ...prevState,
        shopId: user.data.role.shop,
      }));
      addNotification(notificationTypes.SUCCESS, response.message);
      // setCategories((prevCategories) => [...prevCategories, response.category]);
      // await editShop({
      //   ...shop,
      //   categories: [...shop.categories, response.category],
      // });
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while adding new category"
      );

    return response;
  };

  const editCategory = async (categoryData) => {
    if (!categoryData.name || !categoryData._id) {
      addNotification(
        notificationTypes.INFO,
        "please provide the ID and the new name "
      );
      return;
    }

    load();
    const response = await editShopCategory(categoryData);
    console.log(response);
    if (response.success) {
      setShopQueryParams((prevState) => ({
        ...prevState,
        shopId: user.data.role.shop,
      }));
      addNotification(notificationTypes.SUCCESS, response.message);
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while editing category"
      );
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        updateCategories,
        addNewCategory,
        editCategory,
        getCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoriesContext);
};
