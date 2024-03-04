import { createContext, useContext, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import {
  addProduct,
  deleteProduct,
  getProducts,
} from "../../../services/productService";
import { notificationTypes } from "../../Notification/notificationEnum";

// Create the context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const { showNotification, hideNotification } = useNotification();
  const [products, setProducts] = useState([]);

  const updateProducts = (newProduct) => {
    setProducts((prevState) => [...prevState, newProduct]);
  };

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

  const addNewProduct = async (newProduct) => {
    if (!newProduct) {
      showNotification(
        notificationTypes.ERROR,
        "now new product obj, Please pass the new product"
      );
      return;
    }
    showNotification(notificationTypes.LOAD, "");
    const response = await addProduct(newProduct);

    if (response.success) {
      showNotification(notificationTypes.SUCCESS, response.message);
      updateProducts(response.product);
    } else
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while adding new product"
      );
  };

  const deleteProductsById = async (productsToDelete) => {
    if (productsToDelete.length === 0) {
      showNotification(
        notificationTypes.INFO,
        "Please provide the products Id that you want to delete"
      );
      return;
    }

    const response = await deleteProduct(productsToDelete);

    if (response.success) {
      showNotification(notificationTypes.SUCCESS, response.message);
      filterProducts(productsToDelete);
      // Filter out the deleted products from the products state

      // const filteredProducts = products.filter(
      //   (product) => !productsToDelete.includes(product._id)
      // );
      // console.log(filteredProducts);
    } else
      showNotification(
        notificationTypes.ERROR,
        response.message
          ? response.message
          : "error while deleteing the products"
      );
  };

  const filterProducts = (productsToDelete) => {
    setProducts((prevState) =>
      prevState.filter((product) => !productsToDelete.includes(product._id))
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getShopProducts,
        addNewProduct,
        updateProducts,
        deleteProductsById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Create a hook to use the context
export const useProduct = () => {
  return useContext(ProductContext);
};
