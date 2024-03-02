import { useState } from "react";

const ProductForm = ({ onSubmit, categories }) => {
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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        categories: [...formData.categories, value],
      });
    } else {
      setFormData({
        ...formData,
        categories: formData.categories.filter((cat) => cat !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission (if needed)
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      categories: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </label>
      <label>Categories:</label>
      {categories.map((category) => (
        <label key={category._id}>
          <input
            type="checkbox"
            name="category"
            value={category._id}
            checked={formData.categories.includes(category._id)}
            onChange={handleCheckboxChange}
          />
          {category.name}
        </label>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
