import { useEffect, useState } from "react";
import "./Categories.css";
import Navbar from "../../Navbar/Navbar";
import { useCategories } from "../../../../context/Shop/Categories/CategoriesContext";
import { useUser } from "../../../../context/User/UserContext";
import { navbarLinks } from "../../../../enum/linksEnum/shopAdminLinks";

import { useShop } from "../../../../context/Shop/shops/ShopsContext";
import EditCategoryForm from "../../../../components/EditCategoryForm/EditCategoryForm";
import Category from "../../../../components/Category/Category";

const Categories = () => {
  const { categories, getCategories, addNewCategory } = useCategories();
  const { shop, setShopQueryParams } = useShop();
  const { user } = useUser();

  const [newCategory, setNewCategory] = useState("");

  const handleChange = (event) => {
    setNewCategory(event.target.value);
  };

  useEffect(() => {
    if (!shop.name) {
      setShopQueryParams((prevState) => ({
        ...prevState,
        shopId: user.data.role.shop,
      }));
    }
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
          {shop?.name &&
            shop?.categories.map((category, i) => {
              return <Category category={category} i={i} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
