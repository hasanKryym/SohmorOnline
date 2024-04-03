import { useParams } from "react-router-dom";
import "./Shop.css";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../Home/HomeSlider/Slider";
import ItemsSlider from "../../components/Shop/ItemsSlider/Slider";
import Footer from "../../components/Footer/Footer";
import { FaStar } from "react-icons/fa";
import { IoMdFlame } from "react-icons/io";
import { FaFireFlameCurved } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Products from "../../components/Products/Products";
import { useShop } from "../../context/Shop/shops/ShopsContext";
import { useProduct } from "../../context/Shop/Products/ProductsContext";

const Shop = () => {
  const { id } = useParams();
  const { shop, setShopQueryParams } = useShop();
  const { setProductReviews, setProduct } = useProduct();
  const {
    products,
    offers,
    queryParameters,
    setQueryParameters,
    getOffers,
    getShopProducts,
  } = useProduct();

  useEffect(() => {
    getOffers(products);
  }, [products]);

  useEffect(() => {
    if (!shop.name) {
      setShopQueryParams((prevState) => ({ shopId: id }));
    }
    if (products.length === 0) setQueryParameters({ shopId: id });
  }, []);

  useEffect(() => {
    setProduct({});
    setProductReviews([]);
  }, []);

  return (
    <>
      <Navbar />

      <div className="shop_container">
        <div className="title_container">
          <span className="star">
            <FaStar />
          </span>
          {shop?.name}
          <span className="star">
            <FaStar />
          </span>
        </div>
        <Slider images={shop?.sliderImages ?? []} />

        {offers.length !== 0 && (
          <>
            <div className="title_container">
              <span className="flame">
                <FaFireFlameCurved />
              </span>
              OFFERS
              <span className="flame">
                <FaFireFlameCurved />
              </span>
            </div>
            <ItemsSlider items={offers} />
          </>
        )}

        <Products items={products} />
      </div>

      <Footer />
    </>
  );
};

export default Shop;
