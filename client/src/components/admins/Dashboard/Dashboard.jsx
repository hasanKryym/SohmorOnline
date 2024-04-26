import ShopProduct from "./ShopProduct/ShopProduct";
import "./Dashboard.css";
import { useLocation } from "react-router-dom";
import ShopRow from "./ShopRow/ShopRow";
import ProductFilterForm from "../../ProductFilterForm/ProductFilterForm";
import ShopFilterForm from "../../ShopFilterForm/ShopFilterForm";

const Dashboard = ({ headers, data }) => {
  const location = useLocation();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title title_container">Dashboard</h1>

      {data.length !== 0 && (
        <>
          {location.pathname === "/shops/adminPanel/dashboard" && (
            <ProductFilterForm />
          )}

          {location.pathname === "/siteAdmin/adminPanel/dashboard" && (
            <ShopFilterForm />
          )}
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
        </>
      )}
    </div>
  );
};

export default Dashboard;
