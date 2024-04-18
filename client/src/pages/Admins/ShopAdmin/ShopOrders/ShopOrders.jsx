import { navbarLinks } from "../../../../enum/linksEnum/shopAdminLinks";
import Orders from "../../../Profile/Orders/Orders";
import Navbar from "../../Navbar/Navbar";
import "./ShopOrders.css";

const ShopOrders = () => {
  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <Orders />
    </>
  );
};

export default ShopOrders;
