import "./Shops.css";
import Shop from "../../components/Shop/Shop";
import Navbar from "../../components/Navbar/Navbar";
import { CiSearch } from "react-icons/ci";
import Footer from "../../components/Footer/Footer";
import { useShop } from "../../context/Shop/shops/ShopsContext";
import { useEffect } from "react";

const Shops = () => {
  const { shops, get_shops } = useShop();

  useEffect(() => {
    get_shops();
  }, []);
  return (
    <>
      <Navbar />
      <div className="shops_header">
        <div className="title_container">shops</div>
        <div className="middle">
          <div className="search-input_container">
            <input
              className="custom-input"
              type="text"
              name=""
              id=""
              placeholder="Search shops..."
            />
            <button className="search-btn">
              <CiSearch />
            </button>
          </div>
          <button className="custom-button">filter</button>
        </div>
      </div>

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
