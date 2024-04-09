import { useEffect, useState } from "react";
import "./Product.css";
import { pagesNavArr, productNav } from "./ProuctEnum";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import RatingForm from "../RatingForm/RatingForm";
import { useUser } from "../../context/User/UserContext";
import { useCart } from "../../context/Cart/CartContext";
import { useShop } from "../../context/Shop/shops/ShopsContext";
import { useProduct } from "../../context/Shop/Products/ProductsContext";
import Comments from "./Comments/Comments";

const Product = ({ product }) => {
  const { user, isLoggedIn, showLoginNotification, editFav } = useUser();
  const { _id, name, description, image, price, offer, rating, isAvailable } =
    product;
  const [showRatingForm, setShowRatingForm] = useState(false);
  const { addToCart } = useCart();
  const { shop } = useShop();
  const { isFav, setIsFav } = useProduct();

  const closeRatingForm = () => {
    setShowRatingForm(false);
  };

  const [selectedPage, setSelectedPage] = useState(productNav.OVERVIEW);

  return (
    <>
      {showRatingForm && (
        <RatingForm closeRatingForm={closeRatingForm} productId={_id} />
      )}

      <div className="product_container">
        <div className="product">
          <img src={image} alt="" />
          <div className="product_info">
            <div className="title">
              {name}
              <span className="price">
                ${offer !== 0 ? price - (price * offer) / 100 : price}
              </span>
            </div>
            <div className="navigation">
              <ul className="list">
                {pagesNavArr.map(({ id, value }) => {
                  return (
                    <li
                      key={id}
                      onClick={(e) => {
                        if (e.currentTarget.id === productNav.RATING) return;
                        if (
                          !isLoggedIn() &&
                          e.currentTarget.id === productNav.COMMENTS
                        ) {
                          showLoginNotification();
                          return;
                        }
                        setSelectedPage(e.currentTarget.id);
                      }}
                      className="list-item"
                      id={id}
                    >
                      {value === productNav.RATING ? (
                        <span className="rating">
                          {rating}
                          <span className="star">
                            <FaStar />
                          </span>
                        </span>
                      ) : (
                        value
                      )}

                      <div
                        className={`underline ${
                          selectedPage === id && "isSelected"
                        }`}
                      ></div>
                    </li>
                  );
                })}
              </ul>
              <div className="underline"></div>
            </div>
            {selectedPage === productNav.OVERVIEW && (
              <p className="product_description">{description}</p>
            )}
            {selectedPage === productNav.COMMENTS && <Comments />}

            <div className="action-buttons">
              <button
                disabled={!isAvailable}
                onClick={() => {
                  if (!isLoggedIn()) {
                    showLoginNotification();
                    return;
                  }
                  addToCart({ product: _id, shop: shop._id, quantity: 1 });
                }}
                className="custom-button"
              >
                Add To Cart
              </button>

              <button
                title={`${
                  isFav ? "remove from favorites" : "add to favorites"
                }`}
                onClick={() => {
                  if (!isLoggedIn()) {
                    showLoginNotification();
                    return;
                  }
                  if (!isFav) {
                    editFav({
                      ...user.data.fav, // Spread the entire fav object
                      products: [...user.data.fav.products, _id], // Add the new productId to the products array
                    });
                    setIsFav(true);
                  } else {
                    const newProductsFav = user.data.fav.products.filter(
                      (product) => {
                        return product._id !== _id;
                      }
                    );

                    editFav({
                      ...user.data.fav, // Spread the entire fav object
                      products: newProductsFav, // Add the new productId to the products array
                    });
                    setIsFav(false);
                  }
                }}
                className={`custom-button heart ${isFav && "isFavorate"}`}
              >
                <FaHeart />
              </button>
            </div>

            <button
              onClick={() => {
                if (!isLoggedIn()) {
                  showLoginNotification();
                  return;
                }
                setShowRatingForm(true);
              }}
              className="custom-button rate-button"
            >
              Rate this{" "}
              <span className="star">
                <FaStar />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
