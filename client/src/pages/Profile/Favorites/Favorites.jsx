import "./Favorites.css";
import { useUser } from "../../../context/User/UserContext";
import { useEffect, useState } from "react";
import ShopItem from "../../../components/Shop/ShopItem/ShopItem";
import Sidebar from "../Sidebar/Sidebar";
import Shop from "../../../components/Shop/Shop";
import Navbar from "../../../components/Navbar/Navbar";
import { useShop } from "../../../context/Shop/shops/ShopsContext";
import { useProduct } from "../../../context/Shop/Products/ProductsContext";

const Favorites = () => {
  const { user } = useUser();
  const { setShop } = useShop();
  const { setProducts, setProduct } = useProduct();

  const favoritesPages = {
    SHOPS: "shops",
    PRODUCTS: "products",
  };

  const [selectedPage, setSelectedPage] = useState(favoritesPages.PRODUCTS);

  //   useEffect(() => {
  //     setShop({});
  //     setProduct({});
  //     setProducts([]);
  //   });

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="profile_page-container">
        <div className="favorites_nav">
          <ul className="favorites_nav-list">
            <li
              className={`favorites_nav-item ${
                selectedPage === favoritesPages.PRODUCTS ? "active" : ""
              }`}
              onClick={() => setSelectedPage(favoritesPages.PRODUCTS)}
            >
              Products
            </li>
            <li
              className={`favorites_nav-item ${
                selectedPage === favoritesPages.SHOPS ? "active" : ""
              }`}
              onClick={() => setSelectedPage(favoritesPages.SHOPS)}
            >
              Shops
            </li>
          </ul>
        </div>
        <div className="favorites_container">
          {selectedPage === favoritesPages.PRODUCTS
            ? user.data.fav.products.map((product) => (
                <ShopItem key={product._id} item={product} />
              ))
            : user.data.fav.shops.map((shop) => (
                <Shop key={shop._id} shop={shop} />
              ))}
        </div>
      </div>
    </>
  );
};

export default Favorites;
