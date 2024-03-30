import "./Products.css";
import { CiSearch } from "react-icons/ci";
import ShopItem from "../../components/Shop/ShopItem/ShopItem";
import { useState } from "react";
import { useProduct } from "../../context/Shop/Products/ProductsContext";

const Products = ({ items }) => {
  const [searchInput, setSearchInput] = useState("");
  const {
    products,
    offers,
    queryParameters,
    setQueryParameters,
    getOffers,
    getShopProducts,
  } = useProduct();
  return (
    <>
      <div className="products_container">
        <div className="title_container">Products</div>
        <div className="middle">
          <div className="search-input_container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchInput)
                  setQueryParameters({
                    ...queryParameters,
                    search: searchInput,
                  });
              }}
            >
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
          <button className="custom-button">filter</button>
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
