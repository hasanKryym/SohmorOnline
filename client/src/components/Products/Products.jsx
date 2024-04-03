import "./Products.css";
import ShopItem from "../../components/Shop/ShopItem/ShopItem";
import { useState } from "react";
import { useProduct } from "../../context/Shop/Products/ProductsContext";
import { Filter } from "../Filter/Filter";
import { CiSearch } from "react-icons/ci";
import { MdRefresh } from "react-icons/md";
import ProductFilterForm from "../ProductFilterForm/ProductFilterForm";

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
        <ProductFilterForm />

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
