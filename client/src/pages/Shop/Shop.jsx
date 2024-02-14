import { useParams } from "react-router-dom";
import "./Shop.css";
import { shopsData } from "../Shops/shopsData";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../Home/HomeSlider/Slider";
import ItemsSlider from "../../components/Shop/ItemsSlider/Slider";
import Footer from "../../components/Footer/Footer";
import { FaStar } from "react-icons/fa";
import { IoMdFlame } from "react-icons/io";
import { FaFireFlameCurved } from "react-icons/fa6";
import { shopItems } from "../../components/Shop/ShopItem/shopItems";
import { useEffect, useState } from "react";
import ShopItem from "../../components/Shop/ShopItem/ShopItem";
import { CiSearch } from "react-icons/ci";

const Shop = () => {
  const { id } = useParams();
  const { name, description, rating, image } = shopsData[0];

  const [items, setItems] = useState(shopItems);
  const [offerItems, setOfferItems] = useState([]);

  useEffect(() => {
    const offers = items.filter((item) => {
      return item.offer > 0;
    });

    setOfferItems(offers);
  }, []);

  return (
    <>
      <Navbar />

      <div className="shop_container">
        <div className="title_container">
          <span className="star">
            <FaStar />
          </span>
          {name}
          <span className="star">
            <FaStar />
          </span>
        </div>
        <Slider />

        <div className="title_container">
          <span className="flame">
            <FaFireFlameCurved />
          </span>
          OFFERS
          <span className="flame">
            <FaFireFlameCurved />
          </span>
        </div>

        <ItemsSlider items={offerItems} />

        <div className="title_container">Products</div>
        <div className="middle">
          <div className="search-input_container">
            <input
              className="custom-input"
              type="text"
              name=""
              id=""
              placeholder="Search products..."
            />
            <button className="search-btn">
              <CiSearch />
            </button>
          </div>
          <button className="custom-button">filter</button>
        </div>

        <div className="items_container">
          {items.map((item) => {
            return <ShopItem key={item.id} item={item} />;
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;