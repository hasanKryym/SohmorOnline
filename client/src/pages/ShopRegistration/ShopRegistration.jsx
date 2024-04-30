import React, { useEffect, useState } from "react";
import { notificationTypes } from "../../context/Notification/notificationEnum";
import AddImage from "../../components/UploadCare/UploadCare";
import { useDomain } from "../../context/Shop/Domains/DomainsContext";
import { useNotification } from "../../context/Notification/NotificationContext";
import UserPositions from "../../enum/userEnum/userPositionsEnum";
import { useShop } from "../../context/Shop/shops/ShopsContext";

const ShopRegistration = () => {
  const { addNotification } = useNotification();
  const { domains, getDomains } = useDomain();
  const { addRegistrationRequest } = useShop();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    number: "",
    role: {
      position: UserPositions.SHOP_ADMIN,
      shop: null,
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

  useEffect(() => {
    if (domains.length === 0) getDomains();
  }, []);

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

    const requestData = {
      shopInfo: formData,
      adminInfo: userData,
    };

    const response = await addRegistrationRequest(requestData);
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
          position: UserPositions.SHOP_ADMIN,
          shop: null,
        },
      });
    }
  };
  return (
    <>
      <div className="title_container">Register New Shop</div>
      <div className="shop_form-container">
        <div className="title_container">Shop Info:</div>
        <form onSubmit={handleSubmit} className="shop_form">
          <label className="form-label">Shop name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="custom-input"
          />
          <label className="form-label">Shop description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="custom-input"
          />
          <label className="form-label">shop address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="custom-input"
          />
          <label className="form-label">Shop phone number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="custom-input"
          />
          <label className="form-label">Shop image:</label>
          <AddImage setFormData={setFormData} />
          <br />
          <label className="form-label">
            {" "}
            Choose your shop domain: (You may choose up to three domains.)
          </label>
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
          <label className="form-label">Full Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleUserDataChange}
            className="custom-input"
          />

          <label className="form-label">Email:</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleUserDataChange}
            className="custom-input"
          />

          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleUserDataChange}
            className="custom-input"
          />

          <label className="form-label">Address:</label>
          <input
            type="address"
            name="address"
            value={userData.address}
            onChange={handleUserDataChange}
            className="custom-input"
          />
          <label className="form-label">Phone number:</label>
          <input
            type="text"
            name="number"
            value={userData.number}
            onChange={handleUserDataChange}
            className="custom-input"
          />
          <div className="shopForm_buttons-container">
            <button type="submit" className="custom-button">
              Add Request
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShopRegistration;
