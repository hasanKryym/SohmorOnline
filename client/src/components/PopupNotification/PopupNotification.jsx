import React from "react";
import "./PopupNotification.css";

const PopupNotification = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          <button className="popup-button confirm" onClick={onConfirm}>
            Confirm
          </button>
          <button className="popup-button cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupNotification;
