import { useEffect, useState } from "react";
import { useNotification } from "../../../../context/Notification/NotificationContext";
import { useUser } from "../../../../context/User/UserContext";
import { navbarLinks } from "../../../../enum/linksEnum/shopAdminLinks";
import Navbar from "../../Navbar/Navbar";
import "./EditShop.css";
import { notificationTypes } from "../../../../context/Notification/notificationEnum";
import { useDomain } from "../../../../context/Shop/Domains/DomainsContext";
import { useShop } from "../../../../context/Shop/shops/ShopsContext";
import AddImage from "../../../../components/UploadCare/UploadCare";
import { CiLogout } from "react-icons/ci";

const EditShop = () => {
  const { addNotification } = useNotification();
  const { domains, getDomains } = useDomain();
  const { user, logout } = useUser();
  const { shop, setShopQueryParams, editShop } = useShop();

  useEffect(() => {
    if (!shop.name) {
      setShopQueryParams((prevState) => ({
        ...prevState,
        shopId: user.data.role.shop,
      }));
    }
    if (shop.name) if (!shop.isActive) return;
    if (domains.length === 0) getDomains();
  }, []);

  useEffect(() => {
    setFormData({
      name: shop?.name,
      description: shop?.description,
      address: shop?.address,
      phoneNumber: shop?.phoneNumber,
      domain: shop?.domain,
      image: shop?.image,
    });
  }, [shop]);

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
      addNotification(
        notificationTypes.INFO,
        "please fill the required fields"
      );
      return;
    }

    if (
      formData.name === shop.name &&
      formData.description === shop.description &&
      formData.image === shop.image &&
      formData.address === shop.address &&
      formData.phoneNumber === shop.phoneNumber &&
      formData.domain === shop.domain
    )
      return;
    await editShop(formData);
    setShopQueryParams((prevState) => ({
      ...prevState,
      shopId: user.data.role.shop,
    }));
  };

  const copyShopURL = () => {
    navigator.clipboard
      .writeText(`https://sohmor.tech/shops/${user.data.role.shop}`)
      .then(() => {
        addNotification(
          notificationTypes.SUCCESS,
          "Shop URL copied to clipboard!"
        );
      })
      .catch((err) => {
        console.error("Failed to copy the URL: ", err);
      });
  };
  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}
      >
        <button
          title="logout"
          onClick={() => logout()}
          className="secondary-button"
        >
          <CiLogout />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: "0 2rem",
          gap: "1rem",
        }}
      >
        <button className="custom-button" onClick={() => copyShopURL()}>
          Copy my shop URL
        </button>
        <span>
          (You can use this URL to share your shop on social media platforms
          like Instagram, Facebook, TikTok, and more.)
        </span>
      </div>
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
          <label className="form-label">
            Image: (Note: choose a new image for your shop profile if needed)
          </label>
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
              Save
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  name: shop?.name,
                  description: shop?.description,
                  address: shop?.address,
                  phoneNumber: shop?.phoneNumber,
                  domain: shop?.domain,
                  image: shop?.image,
                })
              }
              className="secondary-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditShop;
