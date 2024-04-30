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
import { FaWhatsappSquare } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const Shop = () => {
  const { id } = useParams();
  const { user, setUser, isLoggedIn, showLoginNotification } = useUser();
  const { shop, setShopQueryParams, isFav, setIsFav } = useShop();
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

  return (
    <>
      <Navbar />

      <div className="shop_container">
        <div className="shop_info-container">
          <span className="shop-info">
            <FaWhatsappSquare className="whatsapp_logo" /> {shop.phoneNumber}
          </span>

          <span className="shop-info">
            <IoLocationSharp className="location-icon" />{" "}
            <span>{shop.address}</span>
          </span>
        </div>
        <div className="title_container">
          {shop?.name}
          <button
            title={`${isFav ? "remove from favorites" : "add to favorites"}`}
            onClick={() => {
              if (!isLoggedIn()) {
                showLoginNotification();
                return;
              }
              if (!isFav) {
                setUser((prevUser) => ({
                  ...prevUser,
                  data: {
                    ...prevUser.data,
                    fav: {
                      ...prevUser.data.fav,
                      shops: [...prevUser.data.fav.shops, shop._id],
                    },
                  },
                }));

                setIsFav(true);
              } else {
                const newshopsFav = user.data.fav.shops.filter((_id) => {
                  return _id !== shop._id;
                });

                setUser((prevUser) => ({
                  ...prevUser,
                  data: {
                    ...prevUser.data,
                    fav: {
                      ...prevUser.data.fav,
                      shops: newshopsFav,
                    },
                  },
                }));
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
            <div className="shop_offers-title">
              <span className="flame">
                <FaFireFlameCurved />
              </span>
              <div className="title_container">OFFERS</div>
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
