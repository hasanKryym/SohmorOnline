import { useContext, useState, useEffect } from "react";
import "./OrdersFilterForm.css";
import { useUser } from "../../context/User/UserContext";
import { ordersStatusArr } from "../../enum/OrderStatuses/orderstatuses";

const OrdersFilterForm = () => {
  const { setOrdersParams } = useUser();
  const [status, setStatus] = useState("");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    setOrdersParams({ status });
  }, [status]);

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
