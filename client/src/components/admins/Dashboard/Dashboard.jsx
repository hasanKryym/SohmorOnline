import ShopProduct from "./ShopProduct/ShopProduct";
import "./Dashboard.css";
import { Link, useLocation } from "react-router-dom";
import { useNotification } from "../../../context/Notification/NotificationContext";
import ShopRow from "./ShopRow/ShopRow";
import { useState } from "react";
import { useProduct } from "../../../context/Shop/Products/ProductsContext";
import ProductFilterForm from "../../ProductFilterForm/ProductFilterForm";
import ShopFilterForm from "../../ShopFilterForm/ShopFilterForm";

const Dashboard = ({ headers, data }) => {
  const location = useLocation();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title title_container">Dashboard</h1>

      {location.pathname === "/shops/adminPanel/dashboard" && (
        <ProductFilterForm />
      )}

      {location.pathname === "/siteAdmin/adminPanel/dashboard" && (
        <ShopFilterForm />
      )}
      <nav className="dashboard-nav">
        <ul className="dashboard-nav-list">
          <li>{/* <Link to="/dashboard">Home</Link> */}</li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {location.pathname === "/shops/adminPanel/dashboard" && (
              <ShopProduct data={data} />
            )}

            {location.pathname === "/siteAdmin/adminPanel/dashboard" && (
              <ShopRow data={data} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
