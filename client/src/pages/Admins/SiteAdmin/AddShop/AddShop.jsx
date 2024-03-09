import { useEffect, useState } from "react";
import { notificationTypes } from "../../../../context/Notification/notificationEnum";
import { navbarLinks } from "../../../../enum/linksEnum/siteAdminLinks";
import Navbar from "../../Navbar/Navbar";
import "./AddShop.css";
import { useUser } from "../../../../context/User/UserContext";
import { useShop } from "../../../../context/Shop/shops/ShopsContext";
import { useDomain } from "../../../../context/Shop/Domains/DomainsContext";
import { useNotification } from "../../../../context/Notification/NotificationContext";
import AddImage from "../../../../components/UploadCare/UploadCare";

const AddShop = () => {
  const { showNotification } = useNotification();
  const { domains, getDomains } = useDomain();
  const { shops, get_shops, editShop, addShop } = useShop();

  const { user } = useUser();

  useEffect(() => {
    getDomains();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phoneNumber: "",
    domain: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDomainChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (formData.domain.length < 3) {
        setFormData({
          ...formData,
          domain: [...formData.domain, value],
        });
      }
    } else {
      setFormData({
        ...formData,
        domain: formData.domain.filter((domain) => domain !== value),
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.description ||
      !formData.image ||
      !formData.address ||
      !formData.phoneNumber ||
      formData.domain.length === 0
    ) {
      showNotification(
        notificationTypes.INFO,
        "please fill the required fields"
      );
      return;
    }

    const response = await addShop(formData);
    if (response.success)
      setFormData({
        name: "",
        description: "",
        address: "",
        phoneNumber: "",
        domain: "",
        image: "",
      });
  };
  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <div className="title_container">Add New Shop:</div>
      <div className="shop_form-container">
        <form onSubmit={handleSubmit} className="shop_form">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="custom-input"
          />
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="custom-input"
          />
          <label className="form-label">address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="custom-input"
          />
          <label className="form-label">phoneNumber:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="custom-input"
          />
          <label className="form-label">Image:</label>
          <AddImage setFormData={setFormData} />
          <br />
          <label className="form-label">domains:</label>
          <ul className="form-categories">
            {domains.map((domain) => (
              <li key={domain._id} className="form-domains">
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    value={domain._id}
                    checked={formData?.domain?.includes(domain._id)}
                    onChange={handleDomainChange}
                    className="form-checkbox"
                  />
                  {domain.name}
                </label>
              </li>
            ))}
          </ul>
          <div className="shopForm_buttons-container">
            <button type="submit" className="custom-button">
              Add Shop
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddShop;
