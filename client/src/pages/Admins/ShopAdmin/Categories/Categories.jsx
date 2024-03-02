import { useEffect, useState } from "react";
import { useNotification } from "../../../../context/Notification/NotificationContext";
import {
  createShopCategory,
  getShopCategories,
} from "../../../../services/shopService";
import "./Categories.css";
import { notificationTypes } from "../../../../context/Notification/notificationEnum";
import Navbar from "../../Navbar/Navbar";

const Categories = () => {
  const { showNotification, hideNotification } = useNotification();
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const shopId = "65db576e9b322aadec25830c";
    showNotification(notificationTypes.LOAD, "");
    const response = await getShopCategories(shopId);

    if (response.success) {
      setCategories(response.categories);
      hideNotification();
    } else
      showNotification(
        notificationTypes.ERROR,
        response.message
          ? response.message
          : "error while retrieving categories"
      );
  };

  const [newCategory, setNewCategory] = useState("");

  const handleChange = (event) => {
    setNewCategory(event.target.value);
  };

  const addNewCategory = async (name) => {
    if (!name) {
      showNotification(
        notificationTypes.INFO,
        "please provide a name for the category"
      );
      return;
    }
    showNotification(notificationTypes.LOAD, "");
    const response = await createShopCategory(name);
    console.log(response);
    if (response.success) {
      showNotification(notificationTypes.SUCCESS, response.message);
      setCategories((prevCategories) => [...prevCategories, response.category]);
      setNewCategory("");
    } else
      showNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while adding new category"
      );
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Navbar />
      <div>
        <input
          type="text"
          className="custom-input"
          style={{ width: "350px", marginRight: "1rem" }}
          value={newCategory}
          onChange={handleChange}
          placeholder="Enter new category..."
        />
        <button
          onClick={() => addNewCategory(newCategory)}
          className="custom-button"
        >
          add
        </button>
      </div>
      <div className="">
        {categories.map((category, i) => {
          return <h3 key={i}>{category.name} </h3>;
        })}
      </div>
    </>
  );
};

export default Categories;
