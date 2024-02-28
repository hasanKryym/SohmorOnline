import { useEffect, useState } from "react";
import Dashboard from "../../../../components/admins/Dashboard/Dashboard";
import "./ShopAdminPanel.css";
import { getProducts } from "../../../../services/productService";

const ShopAdminPanel = () => {
  const [products, setProducts] = useState([]);
  // const headers = ["Product ID", "Name", "Price"];
  const headers = ["Product ID", "Name", "Price"];

  const fetchProducts = async () => {
    const productsArr = await getProducts();
    console.log(productsArr);
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
      <div>{/* <Dashboard headers={headers} data={data} /> */}</div>
    </>
  );
};

export default ShopAdminPanel;
