import { Link } from "react-router-dom";
import "./Order.css";
import { useProduct } from "../../context/Shop/Products/ProductsContext";

const Order = ({ order }) => {
  const { _id, createdAt, products, status, shopId: shopData } = order;

  const { setQueryParameters } = useProduct();
  const handleViewProduct = () => {
    setQueryParameters({ shopId: shopData._id });
  };

  // Calculate total order amount
  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <>
      <div className="order">
        <h4>Order ID: {_id}</h4>
        <h3>shop: {shopData.name}</h3>
        <p>status: {status}</p>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>{" "}
        {/* Display total amount */}
        <div className="orders_products-container">
          {products.map((product) => {
            return (
              <>
                <div className="order_product">
                  {product.quantity}{" "}
                  {product?.productId?.name ? (
                    <Link
                      onClick={() => handleViewProduct()}
                      to={`/shops/products/${product.productId._id}`}
                    >
                      {product?.productId?.name}
                    </Link>
                  ) : (
                    "product was deleted by the shop"
                  )}{" "}
                  for ${product.quantity * product.price}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Order;
