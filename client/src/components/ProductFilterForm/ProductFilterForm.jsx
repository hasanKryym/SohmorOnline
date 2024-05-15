import { useState } from "react";
import "./ProductFilterForm.css";
import { useProduct } from "../../context/Shop/Products/ProductsContext";
import { CiSearch } from "react-icons/ci";
import { MdRefresh } from "react-icons/md";
import { Filter } from "../Filter/Filter";

const ProductFilterForm = () => {
  const { queryParameters, setQueryParameters } = useProduct();

  const [showFilterContainer, setShowFilterContainer] = useState(false);

  const closeFilterPage = () => {
    setShowFilterContainer(false);
  };

  const [searchInput, setSearchInput] = useState(queryParameters.search ?? "");

  const clearSearchInput = () => {
    setSearchInput("");
  };
  return (
    <>
      {showFilterContainer && (
        <Filter
          closeFilterPage={closeFilterPage}
          clearSearchInput={clearSearchInput}
        />
      )}
      <div className="product_filter-container">
        <div className="middle">
          <div className="search-input_container">
            <form
              className="products-filter_form"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchInput)
                  setQueryParameters({
                    ...queryParameters,
                    search: searchInput,
                    _id: "",
                    categories: "",
                  });
              }}
            >
              <span
                style={{ fontSize: "24px", cursor: "pointer" }}
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
              <input
                className="custom-input"
                type="text"
                name=""
                id=""
                placeholder="Search products..."
                onChange={(e) => setSearchInput(e.currentTarget.value)}
                value={searchInput}
              />
              <button type="submit" className="search-btn">
                <CiSearch />
              </button>
            </form>
          </div>
          <div className="filter_btn-container">
            <button
              onClick={() => {
                setShowFilterContainer(true);
              }}
              className="custom-button"
            >
              filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilterForm;
