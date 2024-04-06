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
import { useUser } from "../../context/User/UserContext";
import { CiStar } from "react-icons/ci";

const Shop = () => {
  const { id } = useParams();
  const { user, editFav } = useUser();
  const { shop, setShopQueryParams, isFav, setIsFav } = useShop();
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
          {shop?.name}
          <button
            title={`${isFav ? "remove from favorites" : "add to favorites"}`}
            onClick={() => {
              if (!isFav) {
                editFav({
                  ...user.data.fav, // Spread the entire fav object
                  shops: [...user.data.fav.shops, shop._id], // Add the new productId to the products array
                });
                setIsFav(true);
              } else {
                const newshopsFav = user.data.fav.shops.filter(({ _id }) => {
                  return _id !== shop._id;
                });

                editFav({
                  ...user.data.fav, // Spread the entire fav object
                  shops: newshopsFav, // Add the new productId to the products array
                });
                setIsFav(false);
              }
            }}
            className={`star_btn star`}
          >
            {isFav ? <FaStar /> : <CiStar />}
          </button>
          {/* <span className="star">
            <FaStar />
          </span> */}
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
