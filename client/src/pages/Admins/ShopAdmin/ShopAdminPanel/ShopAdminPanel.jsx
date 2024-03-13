import { useEffect, useState } from "react";
import Dashboard from "../../../../components/admins/Dashboard/Dashboard";
import "./ShopAdminPanel.css";
import Navbar from "../../Navbar/Navbar";
import { useProduct } from "../../../../context/Shop/Products/ProductsContext";
import ProductForm from "../../../../components/admins/ProductForm/ProductForm";
import { MdAddToPhotos } from "react-icons/md";
import { useUser } from "../../../../context/User/UserContext";
import UserPositions from "../../../../enum/userEnum/userPositionsEnum";
import { useNavigate } from "react-router-dom";
import {
  navbarLinks,
  headers,
} from "../../../../enum/linksEnum/shopAdminLinks";
import { useCategories } from "../../../../context/Shop/Categories/CategoriesContext";

const ShopAdminPanel = () => {
  const navigate = useNavigate();
  const { products, getShopProducts, queryParameters, setQueryParameters } =
    useProduct();

  const { categories, getCategories } = useCategories();
  const { user } = useUser();
  // const [queryParameter, setQueryParameters] = useState({
  //   shopId: user.data.role.shop,
  // });

  useEffect(() => {
    if (products.length === 0)
      setQueryParameters({ shopId: user.data.role.shop });

    if (categories.length === 0) getCategories(user.data.role.shop);
  }, []);

  useEffect(() => {
    if (
      !user.status.isLoggedIn ||
      !user.data.role.position === UserPositions.SHOP_ADMIN
    ) {
      navigate("/");
    }
  }, []);

  const [showProductForm, setShowProductForm] = useState(false);

  const closeProductForm = () => {
    setShowProductForm(false);
  };

  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
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
        {showProductForm && <ProductForm clostProductForm={closeProductForm} />}
        <Dashboard headers={headers} data={products} />
      </div>
    </>
  );
};

export default ShopAdminPanel;
