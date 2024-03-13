import { useParams } from "react-router-dom";
import "./Product.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductDetails from "../../components/Product/Product";

// import { shopItems } from "../../components/Shop/ShopItem/shopItems";
import Products from "../../components/Products/Products";
import { useProduct } from "../../context/Shop/Products/ProductsContext";
import { useEffect } from "react";

const Product = () => {
  const { id } = useParams();
  const {
    product,
    products,
    offers,
    queryParameters,
    setQueryParameters,
    getOffers,
    getShopProducts,
  } = useProduct();

  useEffect(() => {
    setQueryParameters((prevState) => {
      return { ...prevState, _id: id };
    });
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <ProductDetails product={product} />
        <div className="title_container">Similar Products</div>
        {/* <Products items={shopItems} /> */}
        <Footer />
      </div>
    </>
  );
};

export default Product;
