import React, { useState } from "react";
import "./EditCategoryForm.css";

const EditCategoryForm = ({ category, onSubmit, onClose }) => {
  const [newName, setNewName] = useState(category.name);

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.name === newName) return;
    const categoryData = {
      _id: category._id,
      name: newName,
    };
    onSubmit(categoryData);
  };

  return (
    <div className="edit_category-form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category_id">Category ID:</label>
          <input
            className="custom-input"
            id="category_id"
            type="text"
            value={category._id}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="category_name">New Category Name:</label>
          <input
            className="custom-input"
            id="category_name"
            type="text"
            value={newName}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={() => onClose()} className="custom-button">
            cancel
          </button>
          <button className="custom-button" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryForm;
