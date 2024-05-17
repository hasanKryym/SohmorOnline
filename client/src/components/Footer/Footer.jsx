import { Link } from "react-router-dom";
import ContactUs from "../ContactUs/ContactUs";
import "./Footer.css";
import { favLinksMap } from "./linksHashmap";
// import Logo from "../../assets/images/sohmor-online-high-resolution-logo-transparent.png";
import Logo from "../../assets/images/sohmorOnlineLogo.png";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { useUser } from "../../context/User/UserContext";

const Footer = () => {
  const { user, isLoggedIn } = useUser();
  return (
    <>
      <div className="footer_container">
        <ContactUs />

        {/* Links Map */}
        <div className="linksMap_container">
          {favLinksMap.map(({ name, link }, i) => {
            if ((name === "Cart" || name === "Profile") && !isLoggedIn())
              return;
            return (
              <Link key={i} style={{ color: "#373234" }} to={link}>
                {name}
              </Link>
            );
          })}
        </div>

        {/* Contact Info */}
        <div className="contact_information">
          <img className="Logo" src={Logo} alt="" />
          {/* <div className="input-container">
            <span>
              <FaPhone style={{ color: "#373234" }} />
            </span>
            <input
              readOnly
              style={{ width: "fit-content" }}
              className="custom-input"
              type="text"
              value={"+961 81088631"}
            />
          </div> */}
          <div className="input-container">
            <span>
              <MdOutlineMail style={{ color: "#373234" }} />
            </span>
            <input
              readOnly
              style={{ width: "fit-content" }}
              className="custom-input"
              type="text"
              value={"admin@sohmor.tech"}
            />
          </div>

          {/* Additional Footer Content */}
          <div className="additional_content">
            <p>&copy; 2024 Sohmor Online. All rights reserved.</p>
            {/* <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
          </ul>
           Add your social media icons/links here 
          <div className="social_media_icons">
             Add social media icons and links here 
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
