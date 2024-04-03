import { useState } from "react";
import { useShop } from "../../context/Shop/shops/ShopsContext";
import "./Filter.css";
import { MdRefresh } from "react-icons/md";
import { useProduct } from "../../context/Shop/Products/ProductsContext";

const Filter = ({ closeFilterPage, clearSearchInput }) => {
  const { shop } = useShop();
  const { queryParameters, setQueryParameters } = useProduct();
  const [productFilters, setProductFilters] = useState({
    categories: queryParameters?.categories ?? "",
  });

  return (
    <>
      <div className="blur-bg">
        <div className="center-card filter_container">
          <div className="header">
            <h3>filters</h3>
            <span
              onClick={() => {
                clearSearchInput();
                setQueryParameters((prevState) => ({
                  ...prevState,
                  categories: "",
                  _id: "",
                  search: "",
                }));
                closeFilterPage();
              }}
              className="refresh"
              title="reset filters"
            >
              <MdRefresh />
            </span>
          </div>
          <div className="shop_categories">
            <h3>Categories:</h3>
            <br />
            <ul className="shop_categories-list_container">
              {shop?.categories.map((category) => {
                return (
                  <li
                    onClick={() =>
                      setProductFilters((prevState) => ({
                        ...prevState,
                        categories: category._id,
                      }))
                    }
                    key={category._id}
                    id={category._id}
                    className={`shop_categories-list ${
                      productFilters.categories === category._id && "isSelected"
                    }`}
                  >
                    {category.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="btns_container">
            <button
              onClick={() => {
                clearSearchInput();
                setQueryParameters((prevState) => ({
                  ...prevState,
                  categories: productFilters.categories,
                  _id: "",
                  search: "",
                }));
                closeFilterPage();
              }}
              className="custom-button"
            >
              Save
            </button>
            <button
              onClick={() => closeFilterPage()}
              className="secondary-button"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const ShopsFilter = () => {
  return (
    <>
      <div className="blur-bg">
        <div className="center-card filter_container">
          <div className="header">
            <h3>filters</h3>
            <span className="refresh" title="reset filters">
              <MdRefresh />
            </span>
          </div>
          <div className="shop_categories">
            <h3>Categories:</h3>
            <br />
            <ul className="shop_categories-list_container"></ul>
          </div>
          <div className="btns_container">
            <button className="custom-button">Save</button>
            <button className="secondary-button">cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export { Filter, ShopsFilter };
