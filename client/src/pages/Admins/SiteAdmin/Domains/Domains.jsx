import Navbar from "../../Navbar/Navbar";
import "./Domains.css";
import { navbarLinks } from "../../../../enum/linksEnum/siteAdminLinks";
import { useDomain } from "../../../../context/Shop/Domains/DomainsContext";
import { useEffect, useState } from "react";

const Domains = () => {
  const { domains, getDomains, addDomain } = useDomain();

  const [newDomain, setNewDomain] = useState("");

  const handleChange = (event) => {
    setNewDomain(event.target.value);
  };
  useEffect(() => {
    getDomains();
  }, []);

  const addNewDomain = async (e) => {
    e.preventDefault();
    if (!newDomain) return;
    const response = await addDomain(newDomain);
    if (response.success) setNewDomain("");
  };
  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <div className="title_container">Domains</div>
      <div className="shop_categories-container">
        <div>
          <form onSubmit={addNewDomain}>
            <input
              type="text"
              className="custom-input"
              style={{ width: "350px", marginRight: "1rem" }}
              value={newDomain}
              onChange={handleChange}
              placeholder="Enter new domain..."
            />
            <button type="submit" className="custom-button">
              Add
            </button>
          </form>
        </div>
        <div className="">
          {domains.map((category, i) => {
            return (
              <h3 key={i}>
                <span>{i + 1}_</span>
                {category.name}{" "}
              </h3>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Domains;
