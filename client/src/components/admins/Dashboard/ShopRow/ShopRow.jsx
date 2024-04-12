import "./ShopRow.css";
import { FaTrashAlt } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { useShop } from "../../../../context/Shop/shops/ShopsContext";
import { useState } from "react";
import { shopActivation } from "../../../../services/shopService";
import { useNotification } from "../../../../context/Notification/NotificationContext";
import { notificationTypes } from "../../../../context/Notification/notificationEnum";

const ShopRow = ({ data }) => {
  const { deleteShop } = useShop();
  const { showNotification } = useNotification();

  const handleToggleActive = async (shopId, isActive) => {
    showNotification(notificationTypes.LOAD, "");
    const response = await shopActivation(shopId, isActive);
    if (response.success) {
      data.forEach((shop) => {
        if (shop._id === shopId) {
          shop.isActive = isActive;
        }
      });
      showNotification(notificationTypes.SUCCESS, response.message);
    } else showNotification(notificationTypes.ERROR, response.message);
    // Update the isActive status of the shop
    // You can add your logic to update the status in your context
  };

  return (
    <>
      {/* edit the table to be able to display the products data of the shop */}
      {data.map((shop, index) => (
        <tr className="shop_row" key={shop._id}>
          <td>
            <img className="shop_image" src={shop.image} alt="" />
          </td>
          <td>{shop.name}</td>
          <td>{shop.description}</td>
          <td>{shop.address}</td>
          <td>{shop.phoneNumber}</td>
          <td>{shop.rating}</td>
          <td>
            {/* Checkbox for isActive status */}
            <input
              type="checkbox"
              checked={shop.isActive}
              onChange={(e) => handleToggleActive(shop._id, e.target.checked)}
            />
          </td>

          <td>
            <div className="buttons_container">
              <button className="edit-btn">
                <GrUserAdmin />
              </button>
              <button className="delete-btn">
                <FaTrashAlt onClick={() => deleteShop(shop._id)} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ShopRow;
