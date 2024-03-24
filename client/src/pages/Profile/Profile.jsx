import Navbar from "../../components/Navbar/Navbar";
import { useUser } from "../../context/User/UserContext";
import AccountInfo from "./AccountInfo/AccountInfo";
import "./Profile.css";
import Sidebar from "./Sidebar/Sidebar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div>
        <Sidebar />
        <div className="profile_page-container">
          <AccountInfo />
        </div>
      </div>
    </>
  );
};

export default Profile;
