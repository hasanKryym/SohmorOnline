import { useState } from "react";
import { useCart } from "../../../context/Cart/CartContext";
import "./OrderSummary.css";
import { useUser } from "../../../context/User/UserContext";

const OrderSummary = ({ onClose }) => {
  const { user } = useUser();
  const { cartProductsDetails } = useCart();

  const [totalPrice, setTotalPrice] = useState(
    cartProductsDetails.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0)
  );

  const [userInfo, setUserInfo] = useState({
    address: user.data.address ?? "",
    number: user.data.number ?? "",
  });

  // Event handler for input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Info:", userInfo);
  };

  return (
    <>
      <div className="blur-bg">
        <div className="order_summary">
          <div className="summary-title">
            <h3 className="charcoal">Order Summary</h3>
            <div className="underline-beige"></div>
          </div>

          <div className="info">
            <p className="charcoal">items {cartProductsDetails.length}</p>
            <span className="charcoal">${totalPrice}</span>
          </div>

          {/* <div className="user-info">
            <div className="summary-input">
              Address
              <input className="custom-input" type="text" />
            </div>

            <div className="summary-input">
              Phone
              <input
                className="custom-input"
                type="text"
              />
            </div>
          </div> */}
          <form onSubmit={handleSubmit}>
            <div className="user-info">
              <div className="summary-input">
                Address
                <input
                  className="custom-input"
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={handleChange}
                />
              </div>

              <div className="summary-input">
                Phone
                <input
                  className="custom-input"
                  type="text"
                  name="number"
                  value={userInfo.number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit">Submit</button>
            <div className="underline-beige"></div>

            <div className="summary-total">
              <p>Total</p>
              <span>${totalPrice}</span>
            </div>

            <div className="summary-button">
              <button type="submit" className="custom-button">
                CHECKOUT
              </button>
              <button
                onClick={() => onClose()}
                className="custom-button black-bg"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
