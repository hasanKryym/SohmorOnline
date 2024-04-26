import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import {
  addProduct,
  add_review,
  deleteProduct,
  edit_product,
  getProduct_reviews,
  getProducts,
  getProductsByIds,
  get_review,
} from "../../../services/productService";
import { notificationTypes } from "../../Notification/notificationEnum";
import { useUser } from "../../User/UserContext";

// Create the context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const { user } = useUser();
  const { addNotification, load, hideLoader } = useNotification();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [isFav, setIsFav] = useState(false);
  const [productReviews, setProductReviews] = useState([]);
  const [offers, setOffers] = useState([]);
  const [queryParameters, setQueryParameters] = useState({});

  const [userReview, setUserReview] = useState({
    rating: 0,
    comment: "",
  });

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

  useEffect(() => {
    if (!product._id) {
      setIsFav(false);
      return;
    }
    getProductReviews(product._id);

    user.data.fav.products.forEach((_id) => {
      if (_id === product._id) {
        console.log(_id, product._id);
        setIsFav(true);
        return;
      }
    });
  }, [product]);

  const getShopProducts = async () => {
    if (!queryParameters.shopId) {
      // showNotification(notificationTypes.INFO, "Please provide the shopId");
      setProducts([]);
      return;
    }
    load();
    const response = await getProducts(queryParameters);
    if (response.success) {
      if (queryParameters._id) {
        setProduct(response.products[0]);
        if (user.status.isLoggedIn) getUserReview(queryParameters._id);
        hideLoader();
        return;
      }
      setProducts(response.products);
      hideLoader();
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while retrieving products"
      );
  };

  const addNewProduct = async (newProduct) => {
    if (!newProduct) {
      addNotification(
        notificationTypes.ERROR,
        "no new product obj, Please pass the new product"
      );
      return;
    }
    load();
    const response = await addProduct(newProduct);

    if (response.success) {
      addNotification(notificationTypes.SUCCESS, response.message);
      updateProducts(response.product);
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while adding new product"
      );
  };

  const editProduct = async (productId, updatedFields) => {
    if (!productId || !updatedFields) {
      addNotification(
        notificationTypes.INFO,
        "Please provide the productId and the updated fields"
      );
      return;
    }

    load();
    const response = await edit_product(productId, updatedFields);
    if (response.success) {
      addNotification(notificationTypes.SUCCESS, response.message);
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
      addNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "Error while editing the product"
      );
    }
  };

  const deleteProductsById = async (productsToDelete) => {
    if (productsToDelete.length === 0) {
      addNotification(
        notificationTypes.INFO,
        "Please provide the products Id that you want to delete"
      );
      return;
    }

    const response = await deleteProduct(productsToDelete);

    if (response.success) {
      addNotification(notificationTypes.SUCCESS, response.message);
      filterProducts(productsToDelete);
      // Filter out the deleted products from the products state

      // const filteredProducts = products.filter(
      //   (product) => !productsToDelete.includes(product._id)
      // );
      // console.log(filteredProducts);
    } else
      addNotification(
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

  const addReview = async (review) => {
    load();
    const response = await add_review(review);
    if (response.success)
      addNotification(notificationTypes.SUCCESS, response.message);
    else
      addNotification(
        notificationTypes.ERROR,
        response.message
          ? response.message
          : "error while deleteing the products"
      );

    return response;
  };

  const getUserReview = async (productId) => {
    load();
    const response = await get_review(productId);
    if (response.success) {
      setUserReview(response.review);
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message
          ? response.message
          : "error while retrieving user review"
      );
  };

  const getProductReviews = async (productId) => {
    if (productReviews.length !== 0) return;
    load();
    const response = await getProduct_reviews(productId);
    if (response.success) {
      setProductReviews(response.reviews);
    } else console.log(response.message);

    hideLoader();
    // showNotification(
    //   notificationTypes.ERROR,
    //   response.message
    //     ? response.message
    //     : "error while retrieving product reviews"
    // );
  };

  const getProductsById = async (productsIds) => {
    // showNotification(notificationTypes.LOAD, "");
    const response = await getProductsByIds(productsIds);
    if (response.success) {
      // hideNotification();
      return response;
    } else addNotification(notificationTypes.ERROR, response.message);
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
        userReview,
        setUserReview,
        getShopProducts,
        getOffers,
        addNewProduct,
        updateProducts,
        deleteProductsById,
        editProduct,
        addReview,
        productReviews,
        setProductReviews,
        getProductReviews,
        getProductsById,
        isFav,
        setIsFav,
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
