import "./ShopItem.css";
import { FaStar } from "react-icons/fa";
import image from "../../../assets/images/shop page/Jack Daniels Burgers - Host The Toast.jpg";
import { Link } from "react-router-dom";

const ShopItem = ({ item }) => {
  const { id, name, description, price, rating, offer } = item;
  return (
    <>
      <div className="shop_item">
        <div className="image_container">
          <img src={image} alt="" />
          {offer > 0 && <div className="offer">{offer}%</div>}
        </div>
        <div className="item_details">
          <div className="title">
            {name}
            <span className={`price`}>
              <span className={`${offer > 0 && "dashed"}`}>${price}</span>
              {offer > 0 && (
                <span className="new-price">
                  ${price - (price * offer) / 100}
                </span>
              )}
            </span>
          </div>

          <p className="description">{description}</p>

          <div className="footer">
            <span className="rating">
              <span className="star">
                <FaStar />
              </span>
              {rating}
            </span>
            <Link to={"/shops/123"}>
              <button className="custom-button">View</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopItem;
