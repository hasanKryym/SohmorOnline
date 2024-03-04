import { useEffect, useState } from "react";
import "./ProductForm.css";
import { useCategories } from "../../../context/Shop/Categories/CategoriesContext";
import AddImage from "../../UploadCare/UploadCare";
import { useNotification } from "../../../context/Notification/NotificationContext";
import { notificationTypes } from "../../../context/Notification/notificationEnum";
import { useProduct } from "../../../context/Shop/Products/ProductsContext";

const ProductForm = ({ clostProductForm }) => {
  const { categories, getCategories } = useCategories();
  const { showNotification } = useNotification();
  const { addNewProduct } = useProduct();

  useEffect(() => {
    getCategories("65db576e9b322aadec25830c");
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categories: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (formData.categories.length < 3) {
        setFormData({
          ...formData,
          categories: [...formData.categories, value],
        });
      }
    } else {
      setFormData({
        ...formData,
        categories: formData.categories.filter(
          (category) => category !== value
        ),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.description ||
      !formData.image ||
      !formData.price ||
      formData.categories.length === 0
    ) {
      showNotification(
        notificationTypes.INFO,
        "please fill the required fields"
      );
      return;
    }

    addNewProduct(formData);

    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      categories: [],
    });
    clostProductForm();
  };

  return (
    <div className="blur-bg">
      <div className="center-card">
        <form onSubmit={handleSubmit} className="product_form">
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
          <label className="form-label">Price$:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="custom-input"
          />
          <label className="form-label">Image:</label>
          <AddImage setFormData={setFormData} />
          <br />
          <label className="form-label">Categories:</label>
          <ul className="form-categories">
            {categories.map((category) => (
              <li key={category._id} className="form-category">
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    value={category._id}
                    checked={formData.categories.includes(category._id)}
                    onChange={handleCategoryChange}
                    className="form-checkbox"
                  />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
          <div className="productForm_buttons-container">
            <button type="submit" className="custom-button">
              Add Product
            </button>
            <button
              onClick={() => clostProductForm()}
              className="secondary-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
