import { useEffect } from "react";
import { useShop } from "../../../../context/Shop/shops/ShopsContext";
import { navbarLinks } from "../../../../enum/linksEnum/siteAdminLinks";
import Navbar from "../../Navbar/Navbar";
import "./RegistrationRequests.css";
import RegistrationRequest from "../../../../components/admins/RegistrationRequest/RegistrationRequest";

const RegistrationRequests = () => {
  const { shopRegistrationRequests, getShopRegistrationRequests } = useShop();

  useEffect(() => {
    getShopRegistrationRequests();
  }, []);

  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <div className="shop_registration_requests-container">
        {shopRegistrationRequests.length !== 0 ? (
          shopRegistrationRequests.map((request) => {
            return <RegistrationRequest request={request} />;
          })
        ) : (
          <p>no Requests :( </p>
        )}
      </div>
    </>
  );
};

export default RegistrationRequests;
