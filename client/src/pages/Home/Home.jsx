import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "./HomeSlider/Slider";
import Features from "./Features/Features";

const Home = () => {
  return (
    <>
      <div className="homeContainer">
        <Navbar />
        <Slider />
        <Features />
      </div>
    </>
  );
};

export default Home;
