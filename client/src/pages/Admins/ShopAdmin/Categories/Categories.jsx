import { useEffect, useState } from "react";
import "./Categories.css";
import Navbar from "../../Navbar/Navbar";
import { useCategories } from "../../../../context/Shop/Categories/CategoriesContext";
import { useUser } from "../../../../context/User/UserContext";
import { navbarLinks } from "../../../../enum/linksEnum/shopAdminLinks";

const Categories = () => {
  const { categories, getCategories, addNewCategory } = useCategories();
  const { user } = useUser();

  const [newCategory, setNewCategory] = useState("");

  const handleChange = (event) => {
    setNewCategory(event.target.value);
  };

  useEffect(() => {
    if (categories.length === 0) getCategories(user.data.role.shop);
  }, []);

  const addShopCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) return;
    const response = await addNewCategory(newCategory);
    if (response.success) setNewCategory("");
  };
  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <div className="title_container">products categories</div>
      <div className="shop_categories-container">
        <div>
          <form onSubmit={addShopCategory}>
            <input
              type="text"
              className="custom-input"
              // style={{ width: "350px", marginRight: "1rem" }}
              value={newCategory}
              onChange={handleChange}
              placeholder="Enter new category..."
            />
            <button type="submit" className="custom-button">
              Add
            </button>
          </form>
        </div>
        <div className="">
          {categories.map((category, i) => {
            return (
              <h3 key={i}>
                <span>{i + 1}_</span>
                {category.name}{" "}
              </h3>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;
