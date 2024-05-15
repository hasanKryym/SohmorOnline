import { useEffect } from "react";
import Dashboard from "../../../../components/admins/Dashboard/Dashboard";
import { useShop } from "../../../../context/Shop/shops/ShopsContext";
import Navbar from "../../Navbar/Navbar";
import "./SiteAdminPanel.css";
import { useUser } from "../../../../context/User/UserContext";
import UserPositions from "../../../../enum/userEnum/userPositionsEnum";
import { useNavigate } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";
import {
  navbarLinks,
  headers,
} from "../../../../enum/linksEnum/siteAdminLinks";
import { useDomain } from "../../../../context/Shop/Domains/DomainsContext";

const SiteAdminPanel = () => {
  const { shops, get_shops } = useShop();
  const { domains, getDomains } = useDomain();

  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !user.status.isLoggedIn ||
      !user.data.role.position === UserPositions.SITE_ADMIN
    ) {
      navigate("/");
    }
    if (domains.length === 0) getDomains();
  }, []);

  useEffect(() => {
    if (shops.length === 0) get_shops();
  }, []);
  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "1rem",
        }}
      >
        <button onClick={() => logout()} className="secondary-button">
          logout
        </button>
      </div>

      <Dashboard headers={headers} data={shops} />
    </>
  );
};

export default SiteAdminPanel;
