import "./Products.css";
import { CiSearch } from "react-icons/ci";
import ShopItem from "../../components/Shop/ShopItem/ShopItem";
import { useState } from "react";
import { useProduct } from "../../context/Shop/Products/ProductsContext";
import Filter from "../Filter/Filter";
import { MdRefresh } from "react-icons/md";

const Products = ({ items }) => {
  const {
    products,
    offers,
    queryParameters,
    setQueryParameters,
    getOffers,
    getShopProducts,
  } = useProduct();
  const [showFilterContainer, setShowFilterContainer] = useState(false);
  const [searchInput, setSearchInput] = useState(queryParameters.search ?? "");

  const closeFilterPage = () => {
    setShowFilterContainer(false);
  };

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
      <div className="products_container">
        <div className="title_container">Products</div>
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
          <button
            onClick={() => setShowFilterContainer(true)}
            className="custom-button"
          >
            filter
          </button>
        </div>

        <div className="items_container">
          {items.map((item) => {
            return <ShopItem key={item.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
