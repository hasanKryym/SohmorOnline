import "./ShopItem.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShopItem = ({ item }) => {
  const { _id, name, description, image, price, rating, offer, isAvailable } =
    item;
  return (
    <>
      <div className="shop_item">
        <div className="image_container">
          <img src={image} alt="" />
          {offer > 0 && isAvailable && <div className="offer">{offer}%</div>}
          {!isAvailable && <div className="out_of_stock">out of stock</div>}
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
            <Link to={`/shops/products/${_id}`}>
              <button className="custom-button">View</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopItem;
