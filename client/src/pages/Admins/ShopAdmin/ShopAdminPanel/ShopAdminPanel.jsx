import { useEffect, useState } from "react";
import Dashboard from "../../../../components/admins/Dashboard/Dashboard";
import "./ShopAdminPanel.css";
import { getProducts } from "../../../../services/productService";
import { useNotification } from "../../../../context/Notification/NotificationContext";
import { notificationTypes } from "../../../../context/Notification/notificationEnum";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import { useProduct } from "../../../../context/Shop/Products/ProductsContext";

const ShopAdminPanel = () => {
  const { products, getShopProducts } = useProduct();
  const [queryParameter, setQueryParameters] = useState({
    shopId: "65db576e9b322aadec25830c",
  });
  const headers = [
    "Image",
    "Name",
    "Description",
    "Price($)",
    "Offer(%)",
    "Rating(5)",
  ];

  useEffect(() => {
    getShopProducts(queryParameter);
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Dashboard headers={headers} data={products} />
      </div>
    </>
  );
};

export default ShopAdminPanel;
