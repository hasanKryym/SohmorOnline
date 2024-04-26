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
import userPositions from "../../../../enum/userEnum/userPositionsEnum";

const AddShop = () => {
  const { addNotification } = useNotification();
  const { domains, getDomains } = useDomain();
  const { shops, get_shops, editShop, addShop } = useShop();

  const { user } = useUser();

  useEffect(() => {
    if (domains.length === 0) getDomains();
  }, []);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    number: "",
    role: {
      position: userPositions.SHOP_ADMIN,
      shop: "",
    },
  });
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

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
      formData.domain.length === 0 ||
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.address ||
      !userData.number
    ) {
      addNotification(
        notificationTypes.INFO,
        "please fill the required fields"
      );
      return;
    }

    const response = await addShop(formData, userData);
    if (response.success) {
      setFormData({
        name: "",
        description: "",
        address: "",
        phoneNumber: "",
        domain: "",
        image: "",
      });
      setUserData({
        name: "",
        email: "",
        password: "",
        address: "",
        number: "",
        role: {
          position: userPositions.SHOP_ADMIN,
          shop: "",
        },
      });
    }
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
          <div className="title_container">Admin Info:</div>
          <label className="form-label">name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleUserDataChange}
            className="custom-input"
          />

          <label className="form-label">email:</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleUserDataChange}
            className="custom-input"
          />

          <label className="form-label">password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleUserDataChange}
            className="custom-input"
          />

          <label className="form-label">address:</label>
          <input
            type="address"
            name="address"
            value={userData.address}
            onChange={handleUserDataChange}
            className="custom-input"
          />
          <label className="form-label">number:</label>
          <input
            type="text"
            name="number"
            value={userData.number}
            onChange={handleUserDataChange}
            className="custom-input"
          />
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
