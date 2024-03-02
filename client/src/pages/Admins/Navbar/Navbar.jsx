import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../../assets/images/sohmor-online-high-resolution-logo-transparent.png";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
const Navbar = ({ navbarLinks }) => {
  if (!navbarLinks) {
    navbarLinks = [
      {
        title: "Shop",
        lists: [
          {
            name: "dashboard",
            link: "/shops/adminPanel/dashboard",
          },
          // {
          //   name: "add Product",
          //   link: "/shops/adminPanel/manage/products/add",
          // },
          { name: "categories", link: "/shops/adminPanel/manage/categories" },
        ],
      },

      {
        title: "Delivery",
        lists: [
          {
            name: "add Delivery",
            link: "/shops/adminPanel/manage/delivery/add",
          },
          {
            name: "Orders history",
            link: "/shops/adminPanel/manage/ordersHistory",
          },
        ],
      },
    ];
  }
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <nav className="admin_navbar">
        <img className="Logo" src={Logo} alt="" />
        <ul className="list">
          {navbarLinks.map((item, i) => {
            return (
              <div className="list_container" key={i}>
                <li onClick={() => toggleDropdown(i)} className="list-item">
                  {item.title}{" "}
                  <span>
                    <IoIosArrowDown />
                  </span>
                </li>

                {openIndex === i && (
                  <div className="links">
                    <ul className="list">
                      {item.lists.map(({ name, link }, j) => (
                        <Link to={link} key={j}>
                          <li className="list-item">{name}</li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import Logo from "../../../assets/images/sohmor-online-high-resolution-logo-transparent.png";
// import { IoIosArrowDown } from "react-icons/io";
// import { useState } from "react";

// const Navbar = ({ navbarLinks }) => {
//   if (!navbarLinks) {
//     navbarLinks = [
//       {
//         title: "Shop",
//         lists: [
//           { name: "add Product", link: "/shop/manage/products/add" },
//           { name: "categories", link: "/shop/manage/categories" },
//         ],
//       },

//       {
//         title: "Delivery",
//         lists: [
//           { name: "add Delivery", link: "/shop/manage/delivery/add" },
//           { name: "Orders history", link: "/shop/manage/ordersHistory" },
//         ],
//       },
//     ];
//   }

//   // Create state to manage visibility of each dropdown individually
//   const [showLinks, setShowLinks] = useState(
//     Array(navbarLinks.length).fill(false)
//   );

//   const toggleDropdown = (index) => {
//     const newShowLinks = [...showLinks];
//     newShowLinks[index] = !newShowLinks[index];
//     setShowLinks(newShowLinks);
//   };

//   return (
//     <>
//       <nav className="admin_navbar">
//         <img className="Logo" src={Logo} alt="" />
//         <ul className="list">
//           {navbarLinks.map((item, index) => {
//             return (
//               <div className="list_container" key={index}>
//                 <li onClick={() => toggleDropdown(index)} className="list-item">
//                   {item.title}{" "}
//                   <span>
//                     <IoIosArrowDown />
//                   </span>
//                 </li>

//                 {showLinks[index] && (
//                   <div className="links">
//                     <ul className="list">
//                       {item.lists.map(({ name, link }, subIndex) => {
//                         return (
//                           <Link to={link} key={subIndex}>
//                             <li className="list-item">{name}</li>
//                           </Link>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
