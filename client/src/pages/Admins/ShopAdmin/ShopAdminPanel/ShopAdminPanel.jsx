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
import { useShop } from "../../../../context/Shop/shops/ShopsContext";
import { notificationTypes } from "../../../../context/Notification/notificationEnum";
import { useNotification } from "../../../../context/Notification/NotificationContext";

const ShopAdminPanel = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { products, getShopProducts, queryParameters, setQueryParameters } =
    useProduct();

  const { user, logout } = useUser();
  const { shop, setShopQueryParams } = useShop();
  useEffect(() => {
    if (!shop.name) {
      setShopQueryParams((prevState) => ({
        ...prevState,
        shopId: user.data.role.shop,
      }));
    }
    if (shop.name) if (!shop.isActive) return;
    if (products.length === 0)
      setQueryParameters({ shopId: user.data.role.shop });
  }, []);

  useEffect(() => {
    if (
      !user.status.isLoggedIn ||
      !user.data.role.position === UserPositions.SHOP_ADMIN
    ) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (shop.name) {
      if (!shop.isActive) {
        logout();
        // addNotification(
        //   notificationTypes.WARNING,
        //   "Your account is not activated please contact the admin to activate your account"
        // );

        alert(
          "Your account is not activated please contact the admin to activate your account"
        );
      }
    }
  }, [shop]);

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
        {/* <Filter /> */}

        <Dashboard headers={headers} data={products} />
      </div>
    </>
  );
};

export default ShopAdminPanel;
