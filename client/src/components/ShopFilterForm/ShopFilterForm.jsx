import { useState } from "react";
import { useShop } from "../../context/Shop/shops/ShopsContext";
import "./ShopFilterForm.css";
import { CiSearch } from "react-icons/ci";
import { MdRefresh } from "react-icons/md";
import { ShopsFilter } from "../Filter/Filter";

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
      {showFilterContainer && (
        <ShopsFilter
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
                  setShopQueryParams({
                    ...shopQueryParams,
                    search: searchInput,
                    shopId: "",
                    domain: "",
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
                placeholder="Search shops..."
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
              onClick={() => setShowFilterContainer(true)}
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

export default ShopFilterForm;
