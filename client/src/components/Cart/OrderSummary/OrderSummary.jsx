import "./OrderSummary.css";

const OrderSummary = ({ onClose }) => {
  return (
    <>
      <div className="blur-bg">
        <div className="order_summary">
          <div className="summary-title">
            <h3 className="charcoal">Order Summary</h3>
            <div className="underline-beige"></div>
          </div>

          <div className="info">
            <p className="charcoal">items 2</p>
            <span className="charcoal">$16</span>
          </div>

          <div className="user-info">
            <div className="summary-input">
              Address
              <input className="custom-input" type="text" />
            </div>

            <div className="summary-input">
              Phone
              <input className="custom-input" type="text" />
            </div>
          </div>
          <div className="underline-beige"></div>

          <div className="summary-total">
            <p>Total</p>
            <span>$110</span>
          </div>

          <div className="summary-button">
            <button className="custom-button">CHECKOUT</button>
            <button
              onClick={() => onClose()}
              className="custom-button black-bg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
