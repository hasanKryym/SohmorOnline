import { useEffect } from "react";
import "./Orders.css";
import { useUser } from "../../../context/User/UserContext";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Order from "../../../components/Order/Order";
import { useLocation } from "react-router-dom";
import OrdersFilterForm from "../../../components/OrdersFilterForm/OrdersFilterForm";

const Orders = () => {
  const location = useLocation();
  const { orders, getUserOrders } = useUser();

  const inUserProfile = location.pathname !== "/shops/adminPanel/oders";

  useEffect(() => {
    if (orders.length === 0) getUserOrders();
  }, []);
  return (
    <>
      {inUserProfile && <Navbar />}

      <Sidebar />
      <div className="profile_page-container">
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          {inUserProfile ? "My Orders:" : "shop Orders: "}
        </div>
        <OrdersFilterForm />
        <div className="orders_container">
          {orders.length !== 0 ? (
            orders.map((order) => {
              return <Order order={order} key={order._id} />;
            })
          ) : (
            <p style={{ textAlign: "center" }}>no orders history</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
