import { useEffect, useState } from "react";
import "./ProductForm.css";
import { useCategories } from "../../../context/Shop/Categories/CategoriesContext";
import AddImage from "../../UploadCare/UploadCare";
import { useNotification } from "../../../context/Notification/NotificationContext";
import { notificationTypes } from "../../../context/Notification/notificationEnum";
import { useProduct } from "../../../context/Shop/Products/ProductsContext";
import { useUser } from "../../../context/User/UserContext";

const ProductForm = ({ clostProductForm, product }) => {
  const { categories, getCategories } = useCategories();
  const { showNotification } = useNotification();
  const { addNewProduct, editProduct } = useProduct();

  const { user } = useUser();

  useEffect(() => {
    getCategories(user.data.role.shop);
  }, []);
  const [formData, setFormData] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? "",
    offer: +product?.offer ?? 0,
    rating: product?.rating ?? 0,
    image: product?.image ?? "",
    categories: product?.categories ?? [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "offer" ? parseInt(value) : value,
    });
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

  const editShopProduct = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price) {
      showNotification(
        notificationTypes.INFO,
        "please fill the required fields"
      );
      return;
    }

    if (
      formData.name === product.name &&
      formData.description === product.description &&
      formData.image === product.image &&
      formData.price === product.price &&
      formData.categories === product.productCategories
    )
      return;
    const response = await editProduct(product._id, formData);

    if (response.success) clostProductForm();
  };

  return (
    <div className="blur-bg">
      <div className="center-card">
        <form
          onSubmit={!product ? handleSubmit : editShopProduct}
          className="product_form"
        >
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
            style={{ resize: "vertical" }}
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
          {product && (
            <>
              <label className="form-label">offer%:</label>
              <input
                type="number"
                name="offer"
                value={formData.offer}
                onChange={handleChange}
                className="custom-input"
              />
            </>
          )}
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
            {product ? (
              <button type="submit" className="custom-button">
                Save
              </button>
            ) : (
              <button type="submit" className="custom-button">
                Add Product
              </button>
            )}

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
