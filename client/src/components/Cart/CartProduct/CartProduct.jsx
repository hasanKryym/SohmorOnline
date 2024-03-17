import "./CartProduct.css";
import { useCart } from "../../../context/Cart/CartContext";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

const CartProducts = ({ product }) => {
  const {
    cartProductsDetails,
    setCartProductsDetails,
    cartItems,
    setCartItems,
  } = useCart();

  // const updateProductQuantity = () => {
  //   const newproductQuantity = cartItems.map((item) => {
  //     if (item.product === product._id) item.quantity = product.quantity;
  //     return item;
  //   });
  //   setCartItems(newproductQuantity);
  // };

  const [productQuantity, setProductQuantity] = useState(product.quantity);

  const updateProductQuantity = useCallback(
    debounce((quantity) => {
      const newproductQuantity = cartItems.map((item) => {
        if (item.product === product._id) item.quantity = quantity;
        return item;
      });
      setCartItems(newproductQuantity);
    }, 500),
    [product.quantity]
  );
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
            setProductQuantity((prevState) => {
              const newValue = prevState > 1 ? prevState - 1 : 1;
              updateProductQuantity(newValue);
              return newValue; // Return the new value for immediate update
            });
          }}
        >
          -
        </button>
        <span className="quantity">{productQuantity}</span>
        <button
          onClick={() => {
            setProductQuantity((prevState) => {
              const newValue = prevState + 1;
              updateProductQuantity(newValue);
              return newValue;
            });
          }}
        >
          +
        </button>
      </td>

      <td className="product-data">
        <span className="price">${product.price}</span>
      </td>

      <td className="product-data">
        <span className="total">${productQuantity * product.price}</span>
      </td>
    </tr>
  );
};

export default CartProducts;
