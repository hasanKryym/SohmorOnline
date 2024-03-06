import "./Navbar.css";
import Logo from "../../assets/images/sohmor-online-high-resolution-logo-transparent.png";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { pagesLinks } from "./pagesLinksEnum";
import { useUser } from "../../context/User/UserContext";

const Navbar = () => {
  const { user } = useUser();
  const location = useLocation();

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
    {
      name: <FaCartShopping style={{ fontSize: "24px" }} />,
      link: pagesLinks.CART,
    },
    {
      name: <FaUser style={{ fontSize: "24px" }} />,
      link: pagesLinks.PROFILE,
    },
  ];
  return (
    <>
      <nav className="navbar">
        <img className="Logo" src={Logo} alt="" />
        <ul className="nav-list">
          {navbarLinks.map((navLink, i) => {
            return (
              <li className="list-item" key={i}>
                <Link
                  className={
                    navLink.link === location.pathname ? `isSelected` : ""
                  }
                  to={navLink.link}
                >
                  {navLink.name}
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
