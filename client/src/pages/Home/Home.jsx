import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "./HomeSlider/Slider";
import Features from "./Features/Features";
import Actions from "./Actions/Actions";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <div className="homeContainer">
        <Navbar />
        <Slider />
        <Features />
        <Actions />
        <Footer />
      </div>
    </>
  );
};

export default Home;
