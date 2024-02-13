import { Link } from "react-router-dom";
import ContactUs from "../ContactUs/ContactUs";
import "./Footer.css";
import { favLinksMap } from "./linksHashmap";
import Logo from "../../assets/images/sohmor-online-high-resolution-logo-transparent.png";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <div className="footer_container">
        <ContactUs />

        {/* Links Map */}
        <div className="linksMap_container">
          {favLinksMap.map(({ name, link }, i) => {
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
          <div className="input-container">
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
          </div>
          <div className="input-container">
            <span>
              <MdOutlineMail style={{ color: "#373234" }} />
            </span>
            <input
              readOnly
              style={{ width: "fit-content" }}
              className="custom-input"
              type="text"
              value={"hasan.kryym@gmail.com"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
