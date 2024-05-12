import "./Navbar.css";
// import Logo from "../../assets/images/sohmor-online-high-resolution-logo-transparent.png";
import Logo from "../../assets/images/sohmorOnlinePhoneAndBagIcon.jpeg";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { pagesLinks } from "./pagesLinksEnum";
import { useUser } from "../../context/User/UserContext";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { MdNavigateNext } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650) setShowSidebar(true);
    };

    window.addEventListener("resize", handleResize);

    // Initial call to set initial slidesPerView
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navbarLinks = [
    {
      name: "home",
      link: pagesLinks.HOMEPAGE,
    },
    {
      name: "shops",
      link: pagesLinks.SHOPS,
    },
    // Conditionally include the "login" link based on user status
    ...(user.status.isLoggedIn
      ? []
      : [
          {
            name: "login",
            link: pagesLinks.LOGIN,
          },
        ]),
    ...(!user.status.isLoggedIn
      ? []
      : [
          {
            name: <FaCartShopping style={{ fontSize: "24px" }} />,
            link: pagesLinks.CART,
          },
        ]),
    ...(!user.status.isLoggedIn
      ? []
      : [
          {
            name: <FaUser style={{ fontSize: "24px" }} />,
            link: pagesLinks.PROFILE,
          },
        ]),
  ];
  return (
    <>
      <nav className="navbar">
        <img onClick={() => navigate("/")} className="Logo" src={Logo} alt="" />
        {showSidebar ? (
          <FaBarsStaggered
            className="nav_bars"
            onClick={() => setShowSidebar(false)}
          />
        ) : (
          <FaBars
            className="nav_bars"
            onClick={() => {
              setShowSidebar(true);
            }}
          />
        )}

        <ul
          className={`nav-list ${
            showSidebar ? "slide-in-left" : "slide-out-left"
          }`}
        >
          <div className="close_btn-container">
            <button onClick={() => setShowSidebar(false)}>
              <IoMdClose />
            </button>
          </div>
          {navbarLinks.map((navLink, i) => {
            return (
              <li className="list-item" key={i}>
                <Link
                  className={
                    navLink.link === location.pathname ? `isSelected` : ""
                  }
                  to={navLink.link}
                >
                  {navLink.name}{" "}
                  {showSidebar && <MdNavigateNext className="navigate_icon" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
