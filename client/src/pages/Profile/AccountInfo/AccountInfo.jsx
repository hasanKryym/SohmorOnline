import React, { useState } from "react";
import { useUser } from "../../../context/User/UserContext";
import "./AccountInfo.css";

const AccountInfo = () => {
  const { user, editUserData } = useUser();
  const userData = user.data;

  // State object for form fields
  const [formData, setFormData] = useState({
    name: userData.name,
    address: userData.address,
    number: userData.number,
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUserData(formData);

    // Handle form submission here
    // You can access form data using the state object (formData)
  };
  return (
    <>
      <div className="account_info-container">
        <form className="info_form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Name: </label>
            <input
              className="custom-input"
              id="name"
              name="name"
              value={formData.name}
              type="text"
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="email">Email: </label>
            <input
              className="custom-input"
              id="email"
              value={userData.email}
              type="text"
              readOnly
            />
          </div>

          <div className="input-container">
            <label htmlFor="address">Address: </label>
            <input
              className="custom-input"
              id="address"
              name="address"
              value={formData.address}
              type="text"
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="number">Number: </label>
            <input
              className="custom-input"
              id="number"
              name="number"
              value={formData.number}
              type="text"
              onChange={handleInputChange}
            />
          </div>

          <button className="custom-button" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default AccountInfo;
