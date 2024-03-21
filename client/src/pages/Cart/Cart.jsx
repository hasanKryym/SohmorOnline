import "./Cart.css";
import Navbar from "../../components/Navbar/Navbar";
import CartProduct from "../../components/Cart/CartProduct/CartProduct";
import OrderSummary from "../../components/Cart/OrderSummary/OrderSummary";
import { useState } from "react";
import { useCart } from "../../context/Cart/CartContext";

const Cart = () => {
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const { cartProductsDetails, clearCart } = useCart();

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
                {cartProductsDetails.length !== 0 && (
                  <span
                    onClick={() => setShowOrderSummary(true)}
                    className="view-summary"
                  >
                    view summary
                  </span>
                )}
              </h2>
            </div>
            <span>{cartProductsDetails.length} items</span>
          </div>
          <div className="underline-sky-blue"></div>

          {cartProductsDetails.length !== 0 ? (
            <>
              <div className="cart-details">
                <table>
                  <th>Product Details</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  {cartProductsDetails.map((product) => {
                    return <CartProduct product={product} />;
                  })}
                </table>
              </div>
              <div
                className="middle two-rem"
                style={{ display: "flex", gap: "1rem" }}
              >
                <button
                  onClick={() => setShowOrderSummary(true)}
                  className="custom-button"
                >
                  CHECKOUT
                </button>

                <button
                  onClick={() => clearCart()}
                  className="secondary-button"
                >
                  clear
                </button>
              </div>
            </>
          ) : (
            <div className="middle two-rem">
              <p>No Items!</p>
            </div>
          )}
        </div>
      </div>
      {showOrderSummary && <OrderSummary onClose={closeSummary} />}
    </>
  );
};

export default Cart;
