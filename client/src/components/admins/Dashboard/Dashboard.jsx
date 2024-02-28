import ShopProduct from "./ShopProduct/ShopProduct";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = ({ headers, data }) => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <nav className="dashboard-nav">
        <ul className="dashboard-nav-list">
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
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
            <ShopProduct data={data} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
