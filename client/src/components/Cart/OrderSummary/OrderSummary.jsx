import { useState } from "react";
import { useCart } from "../../../context/Cart/CartContext";
import "./OrderSummary.css";
import { useUser } from "../../../context/User/UserContext";

const OrderSummary = ({ onClose }) => {
  const { user, createOrder } = useUser();
  const { cartProductsDetails, clearCart } = useCart();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createOrder();
    if (response.success) {
      onClose();
      // clearCart();
    }
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
            <br />
            <div className="underline-sky-blue"></div>

            <div className="summary-total">
              <p>Total</p>
              <span>${totalPrice}</span>
            </div>

            <div className="summary-button">
              <button type="submit" className="custom-button">
                ORDER
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
