// Sidebar.js
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`shop_admin-sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="title">Admin Panel</h2>
      <nav className="nav-menu">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/categories" className="nav-link">
              Categories
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
