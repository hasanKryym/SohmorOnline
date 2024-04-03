import { useState } from "react";
import { useShop } from "../../context/Shop/shops/ShopsContext";
import "./ShopFilterForm.css";
import { CiSearch } from "react-icons/ci";
import { MdRefresh } from "react-icons/md";

const ShopFilterForm = () => {
  const { shopQueryParams, setShopQueryParams } = useShop();
  const [showFilterContainer, setShowFilterContainer] = useState(false);

  const closeFilterPage = () => {
    setShowFilterContainer(false);
  };

  const [searchInput, setSearchInput] = useState(shopQueryParams.search ?? "");

  const clearSearchInput = () => {
    setSearchInput("");
  };
  return (
    <>
      {/* {showFilterContainer && (
        <Filter
          closeFilterPage={closeFilterPage}
          clearSearchInput={clearSearchInput}
        />
      )} */}
      <div className="product_filter-form">
        <div className="middle">
          <div className="search-input_container">
            <form
              className="products-filter_form"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchInput)
                  setShopQueryParams({
                    ...shopQueryParams,
                    search: searchInput,
                    _id: "",
                  });
              }}
            >
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
          <button
            onClick={() => setShowFilterContainer(true)}
            className="custom-button"
          >
            filter
          </button>
        </div>
      </div>
    </>
  );
};

export default ShopFilterForm;
