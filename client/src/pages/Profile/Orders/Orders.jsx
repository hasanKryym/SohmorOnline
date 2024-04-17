import { useEffect } from "react";
import "./Orders.css";
import { useUser } from "../../../context/User/UserContext";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Order from "../../../components/Order/Order";

const Orders = () => {
  const { orders, getUserOrders } = useUser();

  useEffect(() => {
    if (orders.length === 0) getUserOrders();
  }, []);
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="profile_page-container">
        <div className="title_container">My Orders</div>
        <div className="orders_container">
          {orders.map((order) => {
            return <Order order={order} key={order._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Orders;
