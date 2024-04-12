import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useShop } from "../../context/Shop/shops/ShopsContext";
import { useProduct } from "../../context/Shop/Products/ProductsContext";

const RouteChangeListener = () => {
  const location = useLocation();
  const { setShop } = useShop();
  const { setProducts, setProduct, setProductReviews } = useProduct();

  useEffect(() => {
    // const idRegex = /\/shops\/(?:products\/)?(\w+)/; // Regular expression to match the id
    // const match = location.pathname.match(idRegex); // Try to match the id in the pathname
    //means this
    // location.pathname !== "/shops/:id" || location.pathname !== "/shops/products/:id";
    //   if (!match) {
    //     setShop({});
    //     setProduct({});
    //     setProducts([]);
    //   }

    if (
      !location.pathname.startsWith("/shops/") &&
      !location.pathname.startsWith("/shops/products/")
    ) {
      setShop({});
      setProduct({});
      setProducts([]);
    }

    if (!location.pathname.startsWith("/shops/products/")) {
      setProductReviews([]);
    }
  }, [location.pathname]);

  if (location.pathname !== "/shops/products/:id") return null; // Since this component doesn't render anything
};

export default RouteChangeListener;
