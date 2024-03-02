import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import { notificationTypes } from "../../Notification/notificationEnum";
import {
  createShopCategory,
  getShopCategories,
} from "../../../services/shopService";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const { showNotification, hideNotification } = useNotification();
  const [categories, setCategories] = useState([]);

  const updateCategories = (newCategories) => {
    setCategories(newCategories);
  };

  const getCategories = async (shopId) => {
    // const shopId = "65db576e9b322aadec25830c";
    showNotification(notificationTypes.LOAD, "");
    const response = await getShopCategories(shopId);

    if (response.success) {
      setCategories(response.categories);
      hideNotification();
    } else
      showNotification(
        notificationTypes.ERROR,
        response.message
          ? response.message
          : "error while retrieving categories"
      );

    return response;
  };

  const addNewCategory = async (name) => {
    if (!name) {
      showNotification(
        notificationTypes.INFO,
        "please provide a name for the category"
      );
      return;
    }
    showNotification(notificationTypes.LOAD, "");
    const response = await createShopCategory(name);
    if (response.success) {
      showNotification(notificationTypes.SUCCESS, response.message);
      setCategories((prevCategories) => [...prevCategories, response.category]);
      //    setNewCategory("");
    } else
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while adding new category"
      );

    return response;
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, updateCategories, addNewCategory, getCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoriesContext);
};
