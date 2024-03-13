import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import {
  addProduct,
  deleteProduct,
  edit_product,
  getProducts,
} from "../../../services/productService";
import { notificationTypes } from "../../Notification/notificationEnum";

// Create the context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const { showNotification, hideNotification } = useNotification();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [offers, setOffers] = useState([]);
  const [queryParameters, setQueryParameters] = useState({});

  const updateProducts = (newProduct) => {
    setProducts((prevState) => [...prevState, newProduct]);
  };

  const getOffers = (products) => {
    const offers = products.filter((product) => {
      return product.offer > 0;
    });

    setOffers(offers);
  };

  useEffect(() => {
    getShopProducts();
  }, [queryParameters]);

  const getShopProducts = async () => {
    if (!queryParameters.shopId) {
      showNotification(notificationTypes.INFO);
      setProducts([]);
      return;
    }
    showNotification(notificationTypes.LOAD, "");
    const response = await getProducts(queryParameters);
    if (response.success) {
      if (queryParameters._id) {
        console.log(queryParameters);
        setProduct(response.products[0]);
        hideNotification();
        return;
      }
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
        "no new product obj, Please pass the new product"
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

  const editProduct = async (productId, updatedFields) => {
    if (!productId || !updatedFields) {
      showNotification(
        notificationTypes.INFO,
        "Please provide the productId and the updated fields"
      );
      return;
    }

    showNotification(notificationTypes.LOAD, "");
    const response = await edit_product(productId, updatedFields);
    if (response.success) {
      showNotification(notificationTypes.SUCCESS, response.message);
      // Update the products state only if the response is successful
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          if (product._id === productId) {
            return { ...product, ...updatedFields };
          }
          return product;
        })
      );
      return response;
    } else {
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "Error while editing the product"
      );
    }
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
        product,
        setProduct,
        products,
        setProducts,
        offers,
        queryParameters,
        setQueryParameters,
        getShopProducts,
        getOffers,
        addNewProduct,
        updateProducts,
        deleteProductsById,
        editProduct,
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
