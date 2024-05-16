import { Link, useLocation } from "react-router-dom";
import "./Order.css";
import { useProduct } from "../../context/Shop/Products/ProductsContext";
import { useState } from "react";
import { ordersStatusArr } from "../../enum/OrderStatuses/orderstatuses";
import { useUser } from "../../context/User/UserContext";

const Order = ({ order }) => {
  const location = useLocation();

  const inShopAdminOrdersPanel =
    location.pathname === "/shops/adminPanel/oders";

  const {
    _id,
    createdAt,
    products,
    status,
    shopId: shopData,
    userId: userData,
  } = order;

  const { setQueryParameters } = useProduct();
  const { updateOrderStatus } = useUser();

  const handleViewProduct = () => {
    setQueryParameters({ shopId: shopData._id });
  };

  // Define available statuses for the admin

  // State to hold the selected status
  const [selectedStatus, setSelectedStatus] = useState(status);

  // Handler function to update the selected status
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    updateOrderStatus(_id, { status: e.target.value });
  };

  return (
    <div className="order">
      <h4>Order ID: {_id}</h4>
      {!inShopAdminOrdersPanel && (
        <>
          <h3>Shop: {shopData.name}</h3>
          <p>Shop number: {shopData.phoneNumber}</p>
          <p>Shop address: {shopData.address}</p>
          <p>Status: {status}</p>
        </>
      )}

      {inShopAdminOrdersPanel && (
        <>
          <div className="user_order-data">
            <h4>User Data: </h4>
            <p>
              <span>username: </span>
              {userData.name}
            </p>
            <p>
              <span>email: </span>
              <a href={`mailto:${userData.email}`}>{userData.email}</a>
            </p>
            <p>
              <span>number: </span>
              {userData.number}
            </p>
            <p>
              <span>address: </span>
              {userData.address}
            </p>
          </div>
        </>
      )}

      <p>
        Total Amount: $
        {products
          .reduce(
            (total, product) => total + product.price * product.quantity,
            0
          )
          .toFixed(2)}
      </p>
      {/* Display dropdown for selecting status */}
      {inShopAdminOrdersPanel && (
        <div className="status_dropdown">
          status:{" "}
          <select value={selectedStatus} onChange={handleStatusChange}>
            {ordersStatusArr.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display products */}
      <div className="orders_products-container">
        {products.map((product) => (
          <div className="order_product" key={product._id}>
            {product.quantity}{" "}
            {product?.productId?.name ? (
              <Link
                onClick={handleViewProduct}
                to={`/shops/products/${product.productId._id}`}
              >
                {product.name}
              </Link>
            ) : (
              <span>{product.name}</span>
            )}{" "}
            for ${product.quantity * product.price}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
