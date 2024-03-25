import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "./HomeSlider/Slider";
import Features from "./Features/Features";
import Actions from "./Actions/Actions";
import Footer from "../../components/Footer/Footer";
import { useUser } from "../../context/User/UserContext";
import UserPositions from "../../enum/userEnum/userPositionsEnum";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user.data.role.position === UserPositions.SHOP_ADMIN)
      navigate("/shops/adminPanel/dashboard");
    else if (user.data.role.position === UserPositions.SITE_ADMIN)
      navigate("/siteAdmin/adminPanel/dashboard");
  }, []);
  return (
    <>
      <div className="homeContainer">
        <Navbar />
        {/* <Slider /> */}
        <Features />
        <Actions />
        <Footer />
      </div>
    </>
  );
};

export default Home;
