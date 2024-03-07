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

const ShopAdminPanel = () => {
  const navigate = useNavigate();
  const { products, getShopProducts } = useProduct();
  const { user } = useUser();
  const [queryParameter, setQueryParameters] = useState({
    shopId: user.data.role.shop,
  });
  const navbarLinks = [
    {
      title: "Shop",
      lists: [
        {
          name: "dashboard",
          link: "/shops/adminPanel/dashboard",
        },
        // {
        //   name: "add Product",
        //   link: "/shops/adminPanel/manage/products/add",
        // },
        { name: "categories", link: "/shops/adminPanel/manage/categories" },
      ],
    },

    {
      title: "Delivery",
      lists: [
        {
          name: "add Delivery",
          link: "/shops/adminPanel/manage/delivery/add",
        },
        {
          name: "Orders history",
          link: "/shops/adminPanel/manage/ordersHistory",
        },
      ],
    },
  ];
  const headers = [
    "Image",
    "Name",
    "Description",
    "Price($)",
    "Offer(%)",
    "Rating(5)",
  ];

  useEffect(() => {
    if (
      !user.status.isLoggedIn ||
      !user.data.role.position === UserPositions.SHOP_ADMIN
    ) {
      navigate("/");
    }
    getShopProducts(queryParameter);
  }, []);

  const [showProductForm, setShowProductForm] = useState(false);

  const clostProductForm = () => {
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
        {showProductForm && <ProductForm clostProductForm={clostProductForm} />}
        <Dashboard headers={headers} data={products} />
      </div>
    </>
  );
};

export default ShopAdminPanel;
