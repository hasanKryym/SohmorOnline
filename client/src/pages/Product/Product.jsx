import { useParams } from "react-router-dom";
import "./Product.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductDetails from "../../components/Product/Product";

import { shopItems } from "../../components/Shop/ShopItem/shopItems";

const Product = () => {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <div>
        <ProductDetails product={shopItems[0]} />
        <div className="title_container">Similar Products</div>
      </div>
    </>
  );
};

export default Product;
