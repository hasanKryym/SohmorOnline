import "./Products.css";
import { CiSearch } from "react-icons/ci";
import ShopItem from "../../components/Shop/ShopItem/ShopItem";
import { useState } from "react";
import { useProduct } from "../../context/Shop/Products/ProductsContext";

const Products = ({ items }) => {
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
            <input
              className="custom-input"
              type="text"
              name=""
              id=""
              placeholder="Search products..."
            />
            <button className="search-btn">
              <CiSearch />
            </button>
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
