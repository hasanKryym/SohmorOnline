import React, { useState } from "react";
import "./Category.css";
import EditCategoryForm from "../EditCategoryForm/EditCategoryForm";
import { FaEdit } from "react-icons/fa";
import { useCategories } from "../../context/Shop/Categories/CategoriesContext";

const Category = ({ category, i }) => {
  const { editCategory } = useCategories();

  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);

  const handleEditCategory = async (categoryData) => {
    await editCategory(categoryData);
  };

  const closeEditForm = () => {
    setShowEditCategoryForm(false);
  };

  return (
    <h3>
      <span>{i + 1}_</span>
      {category.name}{" "}
      <span style={{ color: "var(--dark-charcoal)" }}>
        <FaEdit
          onClick={() => {
            setShowEditCategoryForm(true);
          }}
        />
        {showEditCategoryForm && (
          <EditCategoryForm
            category={category}
            onSubmit={handleEditCategory}
            onClose={closeEditForm}
          />
        )}
      </span>
    </h3>
  );
};

export default Category;
