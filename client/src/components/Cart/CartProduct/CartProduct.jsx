import "./CartProduct.css";
import hamburger from "../../../assets/images/shop page/Jack Daniels Burgers - Host The Toast.jpg";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/Cart/CartContext";

const CartProducts = ({ product }) => {
  const {
    cartProductsDetails,
    setCartProductsDetails,
    cartItems,
    setCartItems,
  } = useCart();

  const updateProductQuantity = () => {
    const newproductQuantity = cartItems.map((item) => {
      if (item.product === product._id) item.quantity = product.quantity;
      return item;
    });
    console.log(newproductQuantity);

    setCartItems(newproductQuantity);
  };
  return (
    <tr className="cart_product">
      <td className="product-data">
        <div className="product-details">
          <img src={product.image} alt="" />
          <div className="info">
            <h4>{product.name}</h4>
            {/* <Link
              to={`/shops/products/${product._id}`}
              className="shop-link charcoal"
            >
              view
            </Link> */}
          </div>
        </div>
      </td>

      <td className="product-data">
        <button
          onClick={() => {
            product.quantity--;
            updateProductQuantity();
          }}
        >
          -
        </button>
        <span className="quantity">{product.quantity}</span>
        <button onClick={() => product.quantity++}>+</button>
      </td>

      <td className="product-data">
        <span className="price">${product.price}</span>
      </td>

      <td className="product-data">
        <span className="total">${product.quantity * product.price}</span>
      </td>
    </tr>
  );
};

export default CartProducts;
