import "./CartProduct.css";
import hamburger from "../../../assets/images/shop page/Jack Daniels Burgers - Host The Toast.jpg";
import { Link } from "react-router-dom";

const CartProducts = () => {
  return (
    <tr className="cart_product">
      <td className="product-data">
        <div className="product-details">
          <img src={hamburger} alt="" />
          <div className="info">
            <h4>Hamburger</h4>
            <Link to={"/"} className="shop-link charcoal">
              simple
            </Link>
          </div>
        </div>
      </td>

      <td className="product-data">
        <button>-</button>
        <span className="quantity">1</span>
        <button>+</button>
      </td>

      <td className="product-data">
        <span className="price">$8</span>
      </td>

      <td className="product-data">
        <span className="total">$8</span>
      </td>
    </tr>
  );
};

export default CartProducts;
