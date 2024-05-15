import "./Shops.css";
import Shop from "../../components/Shop/Shop";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useShop } from "../../context/Shop/shops/ShopsContext";
import ShopFilterForm from "../../components/ShopFilterForm/ShopFilterForm";
import { useEffect } from "react";
import { useProduct } from "../../context/Shop/Products/ProductsContext";

const Shops = () => {
  const { shops, get_shops, setShopQueryParams } = useShop();
  const { setOffers } = useProduct();

  useEffect(() => {
    setOffers([]);
  }, []);

  return (
    <>
      <Navbar />
      <div className="shops_header">
        <div className="title_container">shops</div>
      </div>

      <ShopFilterForm />

      <div className="shops_container">
        {shops.map((shop) => {
          return <Shop key={shop._id} shop={shop} />;
        })}
      </div>

      <Footer />
    </>
  );
};

export default Shops;
