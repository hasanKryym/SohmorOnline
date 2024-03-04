import { useEffect, useState } from "react";
import Dashboard from "../../../../components/admins/Dashboard/Dashboard";
import "./ShopAdminPanel.css";
import Navbar from "../../Navbar/Navbar";
import { useProduct } from "../../../../context/Shop/Products/ProductsContext";
import ProductForm from "../../../../components/admins/ProductForm/ProductForm";
import { MdAddToPhotos } from "react-icons/md";

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

  const [showProductForm, setShowProductForm] = useState(false);

  const clostProductForm = () => {
    setShowProductForm(false);
  };

  return (
    <>
      <Navbar />
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "1rem 2rem",
          }}
        >
          <button
            onClick={() => setShowProductForm(true)}
            className="secondary-button"
          >
            Add new Product <MdAddToPhotos />
          </button>
        </div>
        {showProductForm && <ProductForm clostProductForm={clostProductForm} />}
        <Dashboard headers={headers} data={products} />
      </div>
    </>
  );
};

export default ShopAdminPanel;
