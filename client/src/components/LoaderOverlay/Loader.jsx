import "./Loader.css";
import { FaSpinner } from "react-icons/fa";

const Loader = ({ showOverlay }) => {
  return showOverlay ? (
    <div className="loader-overlay">
      <div className="loader">
        <FaSpinner className="spinner" />
      </div>
    </div>
  ) : (
    <div className="loader">
      <FaSpinner className="spinner" />
    </div>
  );
};

export default Loader;
