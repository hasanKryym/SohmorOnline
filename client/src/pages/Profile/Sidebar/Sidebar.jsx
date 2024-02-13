import "./Sidebar.css";
import { profileLinks } from "./ProfileLinks";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <>
      <div className="profile-sidebar">
        <ul className="profile-sidebar-list">
          {profileLinks.map(({ name, link, icon }, i) => {
            return (
              <li key={i} className="profile-sidebar-list_element">
                <Link
                  className={`${location.pathname === link && "isActive"}`}
                  to={link}
                >
                  <span className="icon">{icon}</span>
                  <span className="name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
