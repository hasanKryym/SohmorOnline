import "./Shops.css";
import { shopsData } from "./shopsData";
import Shop from "../../components/Shop/Shop";
import Navbar from "../../components/Navbar/Navbar";
import { CiSearch } from "react-icons/ci";
import Footer from "../../components/Footer/Footer";

const Shops = () => {
  return (
    <>
      <Navbar />
      <div className="shops_header">
        <div className="title_container">shops</div>
        <div className="middle">
          <div className="input_container">
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
        {shopsData.map((shop, i) => {
          return <Shop key={i} shop={shop} />;
        })}
      </div>

      <Footer />
    </>
  );
};

export default Shops;
