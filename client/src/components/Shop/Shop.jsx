import "./Shop.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Shop = ({ shop }) => {
  const { name, description, rating, image } = shop;

  return (
    <>
      <div className="shop">
        <img src={image + "-/quality/lightest/-/progressive/yes/"} alt="" />
        <div className="title">
          <h3>{name}</h3>
        </div>
        <p className="description charcoal">{description}</p>

        <div className="footer">
          {/* <span className="rating">
            <span className="star">
              <FaStar />
            </span>
            {rating}
          </span> */}
          <Link to={`/shops/${shop._id}`}>
            <button className="custom-button">View</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Shop;
