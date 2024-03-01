import { useEffect, useState } from "react";
import Dashboard from "../../../../components/admins/Dashboard/Dashboard";
import "./ShopAdminPanel.css";
import { getProducts } from "../../../../services/productService";
import { useNotification } from "../../../../context/Notification/NotificationContext";
import { notificationTypes } from "../../../../context/Notification/notificationEnum";

const ShopAdminPanel = () => {
  const [products, setProducts] = useState([]);
  const { showNotification, hideNotification } = useNotification();
  // const headers = ["Product ID", "Name", "Price"];
  const headers = [
    "Image",
    "Name",
    "Description",
    "Price($)",
    "Offer(%)",
    "Rating(5)",
  ];

  const fetchProducts = async () => {
    showNotification(notificationTypes.LOAD, "");
    const response = await getProducts();
    if (response.success) {
      setProducts(response.products);
      hideNotification();
    } else
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while retrieving products"
      );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <Dashboard headers={headers} data={products} />
      </div>
    </>
  );
};

export default ShopAdminPanel;
