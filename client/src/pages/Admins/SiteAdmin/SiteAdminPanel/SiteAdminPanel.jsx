import { useEffect } from "react";
import Dashboard from "../../../../components/admins/Dashboard/Dashboard";
import { useShop } from "../../../../context/Shop/shops/ShopsContext";
import Navbar from "../../Navbar/Navbar";
import "./SiteAdminPanel.css";
import { useUser } from "../../../../context/User/UserContext";
import UserPositions from "../../../../enum/userEnum/userPositionsEnum";
import { useNavigate } from "react-router-dom";

const SiteAdminPanel = () => {
  const { shops, get_shops } = useShop();
  const { user } = useUser();
  const navigate = useNavigate();
  const navbarLinks = [
    {
      title: "Shops",
      lists: [
        {
          name: "dashboard",
          link: "/siteAdmin/adminPanel/dashboard",
        },
      ],
    },
  ];
  const headers = [
    "Image",
    "Name",
    "Description",
    "Address",
    "Phone Nb",
    "Rating(5)",
  ];

  useEffect(() => {
    if (
      !user.status.isLoggedIn ||
      !user.data.role.position === UserPositions.SITE_ADMIN
    ) {
      navigate("/");
    }
    get_shops();
  }, []);
  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <Dashboard headers={headers} data={shops} />
    </>
  );
};

export default SiteAdminPanel;
