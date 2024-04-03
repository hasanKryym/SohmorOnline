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

  const { user } = useUser();
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
  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <Dashboard headers={headers} data={shops} />
    </>
  );
};

export default SiteAdminPanel;
