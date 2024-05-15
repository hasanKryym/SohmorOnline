import { useState } from "react";
import { useShop } from "../../context/Shop/shops/ShopsContext";
import "./Filter.css";
import { MdRefresh } from "react-icons/md";
import { useProduct } from "../../context/Shop/Products/ProductsContext";
import ProductsSortByFilter from "../ProductsSortByFilter/ProductsSortByFilter";

const Filter = ({ closeFilterPage, clearSearchInput }) => {
  const { shop } = useShop();
  const { products, setProducts } = useProduct();
  const { queryParameters, setQueryParameters } = useProduct();
  const [productFilters, setProductFilters] = useState({
    categories: queryParameters?.categories ?? "",
  });

  const [sortByFilters, setSortByFilters] = useState({
    price: queryParameters.price ?? "",
    rating: "",
    minPrice: queryParameters?.minPrice ?? "",
    maxPrice: queryParameters?.maxPrice ?? "",
    minRating: queryParameters?.minRating ?? "",
    maxRating: queryParameters?.maxRating ?? "",
  });

  const handleSortByInputChange = (e) => {
    let { name, value } = e.target;
    console.log(name, value);
    if (name === "minPrice" && value < 0) value = 0;
    setSortByFilters({ ...sortByFilters, [name]: value });
  };

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
                  price: "",
                  minPrice: "",
                  maxPrice: "",
                  minRating: "",
                  maxRating: "",
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
              {shop.name &&
                shop?.categories.map((category) => {
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
                        productFilters.categories === category._id &&
                        "isSelected"
                      }`}
                    >
                      {category.name}
                    </li>
                  );
                })}
            </ul>
          </div>
          <ProductsSortByFilter
            sortByFilters={sortByFilters}
            handleSortByInputChange={handleSortByInputChange}
          />
          <div className="btns_container">
            <button
              onClick={() => {
                clearSearchInput();
                setQueryParameters((prevState) => ({
                  ...prevState,
                  categories: productFilters.categories,
                  _id: "",
                  search: "",
                  price: sortByFilters.price,
                  minPrice: sortByFilters.minPrice,
                  maxPrice: sortByFilters.maxPrice,
                  minRating: sortByFilters.minRating,
                  maxRating: sortByFilters.maxRating,
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

const ShopsFilter = ({ clearSearchInput, closeFilterPage }) => {
  const { shopQueryParams, setShopQueryParams, shopsDomains } = useShop();

  const [shopsFilter, setShopsFilter] = useState({
    domain: shopQueryParams?.domain ?? "",
  });

  return (
    <>
      <div className="blur-bg">
        <div className="center-card filter_container">
          <div className="header">
            <h3>filters</h3>
            <span
              style={{ fontSize: "24px", cursor: "pointer" }}
              onClick={() => {
                clearSearchInput();
                setShopQueryParams({});
                closeFilterPage();
              }}
              className="refresh"
              title="reset filters"
            >
              <MdRefresh />
            </span>
          </div>
          <div className="shop_categories">
            <h3>Domains:</h3>
            <br />
            <ul className="shop_categories-list_container">
              {shopsDomains.map((domain) => {
                return (
                  <li
                    onClick={() =>
                      setShopsFilter((prevState) => ({
                        ...prevState,
                        domain: domain._id,
                      }))
                    }
                    key={domain._id}
                    id={domain._id}
                    className={`shop_categories-list ${
                      shopsFilter.domain === domain._id && "isSelected"
                    }`}
                  >
                    {domain.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="btns_container">
            <button
              onClick={() => {
                clearSearchInput();
                setShopQueryParams((prevState) => ({
                  ...prevState,
                  domain: shopsFilter.domain,
                  shopId: "",
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

export { Filter, ShopsFilter };
