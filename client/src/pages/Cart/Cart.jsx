import "./Cart.css";
import Navbar from "../../components/Navbar/Navbar";
import CartProduct from "../../components/Cart/CartProduct/CartProduct";
import OrderSummary from "../../components/Cart/OrderSummary/OrderSummary";
import { useState } from "react";

const Cart = () => {
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const closeSummary = () => {
    setShowOrderSummary(false);
  };
  return (
    <>
      <Navbar />
      <div className="cart_container">
        <div className="cart">
          <div className="cart_title">
            <div className="head">
              <h2>
                Shopping Cart{" "}
                <span
                  onClick={() => setShowOrderSummary(true)}
                  className="view-summary"
                >
                  view summary
                </span>
              </h2>
            </div>
            <span>2 items</span>
          </div>
          <div className="underline-sky-blue"></div>
          <div className="cart-details">
            <table>
              <th>Product Details</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>

              <CartProduct />
              <CartProduct />
            </table>
          </div>
        </div>
        <div className="middle two-rem">
          <button
            onClick={() => setShowOrderSummary(true)}
            className="custom-button"
          >
            CHECKOUT
          </button>
        </div>
      </div>
      {showOrderSummary && <OrderSummary onClose={closeSummary} />}
    </>
  );
};

export default Cart;
