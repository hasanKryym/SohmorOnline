import { useEffect, useState } from "react";
import "./ProductForm.css";
import { useCategories } from "../../../context/Shop/Categories/CategoriesContext";
import AddImage from "../../UploadCare/UploadCare";
import { useNotification } from "../../../context/Notification/NotificationContext";
import { notificationTypes } from "../../../context/Notification/notificationEnum";
import { useProduct } from "../../../context/Shop/Products/ProductsContext";
import { useUser } from "../../../context/User/UserContext";
import { Link } from "react-router-dom";
import { useShop } from "../../../context/Shop/shops/ShopsContext";

const ProductForm = ({ clostProductForm, product }) => {
  const { categories, getCategories } = useCategories();
  const { shop } = useShop();
  const { addNotification, load, hideLoader } = useNotification();
  const { addNewProduct, editProduct } = useProduct();

  const { user } = useUser();

  useEffect(() => {
    // if (categories.length === 0) getCategories(user.data.role.shop);
  }, []);

  const [formData, setFormData] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? "",
    offer: +product?.offer ?? 0,
    rating: product?.rating ?? 0,
    image: product?.image ?? "",
    categories: product?.categories ?? [],
    isAvailable: product?.isAvailable ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: name === "offer" ? parseInt(newValue) : newValue,
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
      addNotification(
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
      isAvailable: true,
    });
    clostProductForm();
  };

  const editShopProduct = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price) {
      addNotification(
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

              {formData.offer > 0 && (
                <p>
                  new Price $:
                  {(
                    formData.price -
                    formData.price * (formData.offer / 100)
                  ).toFixed(1)}
                </p>
              )}
            </>
          )}
          <label className="form-label">
            Image:{" "}
            <span>
              <AddImage setFormData={setFormData} />
            </span>
          </label>

          <label className="form-label">
            Categories:{" "}
            {/* <Link
              className="categories_link"
              to={"/shops/adminPanel/manage/categories"}
            >
              Add New Category
            </Link> */}
          </label>
          <ul className="form-categories">
            {/* {categories.length !== 0 ? (
              categories.map((category) => (
                <li key={category._id} className="form-category">
                  <label className="form-checkbox-label">
                    <input
                      type="checkbox"
                      name="categories"
                      value={category._id}
                      checked={formData.categories.includes(category._id)}
                      onChange={handleCategoryChange}
                      className="form-checkbox"
                    />
                    {category.name}
                  </label>
                </li>
              ))
            ) : (
              <>
                <Link to={"/shops/adminPanel/manage/categories"}>
                  Add Category
                </Link>
                <span>
                  (NOTE: if you dont have at least 1 category you won't be able
                  to add a product)
                </span>
              </>
            )} */}

            {shop?.categories.length !== 0 ? (
              shop?.categories.map((category) => (
                <li key={category._id} className="form-category">
                  <label className="form-checkbox-label">
                    <input
                      type="checkbox"
                      name="categories"
                      value={category._id}
                      checked={formData.categories.includes(category._id)}
                      onChange={handleCategoryChange}
                      className="form-checkbox"
                    />
                    {category.name}
                  </label>
                </li>
              ))
            ) : (
              <>
                <Link to={"/shops/adminPanel/manage/categories"}>
                  Add Category
                </Link>
                <span>
                  (NOTE: if you dont have at least 1 category you won't be able
                  to add a product)
                </span>
              </>
            )}
          </ul>

          <label className="form-label">
            Is Available:
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
          </label>

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
