import { useContext, useState, useEffect } from "react";
import "./OrdersFilterForm.css";
import { useUser } from "../../context/User/UserContext";
import {
  orderStatus,
  ordersStatusArr,
} from "../../enum/OrderStatuses/orderstatuses";

const OrdersFilterForm = () => {
  const { ordersParams, setOrdersParams } = useUser();
  const [status, setStatus] = useState(orderStatus.PENDING);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    const choosenStatus = e.target.value;
    setOrdersParams({ status: choosenStatus });
  };

  useEffect(() => {
    if (ordersParams.status !== orderStatus.PENDING)
      setOrdersParams({ status: orderStatus.PENDING });
  }, []);

  return (
    <div className="orders_filter-container">
      <form>
        <label htmlFor="status">Status: </label>
        <select id="status" value={status} onChange={handleStatusChange}>
          {/* <option value="">All</option> */}
          {ordersStatusArr.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default OrdersFilterForm;
