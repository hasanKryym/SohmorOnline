import { useEffect, useState } from "react";
import Dashboard from "../../../../components/admins/Dashboard/Dashboard";
import "./ShopAdminPanel.css";
import { getProducts } from "../../../../services/productService";

const ShopAdminPanel = () => {
  const [products, setProducts] = useState([]);
  // const headers = ["Product ID", "Name", "Price"];
  const headers = [
    "Image",
    "Name",
    "Description",
    "Price",
    "Offer",
    "Rating",
    "Categories",
  ];

  const fetchProducts = async () => {
    const response = await getProducts();
    if (response.success) {
      setProducts(response.products);
    } else console.error(response.message);
  };

  // Sample data for the table
  // const data = [
  //   ["1", "Product A", "$10"],
  //   ["2", "Product B", "$15"],
  //   ["3", "Product C", "$20"],
  //   // Add more rows as needed
  // ];

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
