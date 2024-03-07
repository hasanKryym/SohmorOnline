import Dashboard from "../../../../components/admins/Dashboard/Dashboard";
import Navbar from "../../Navbar/Navbar";
import "./SiteAdminPanel.css";

const SiteAdminPanel = () => {
  const shops = [];
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
  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <Dashboard headers={headers} data={shops} />
    </>
  );
};

export default SiteAdminPanel;
