import React, { useState } from "react";
import "./ProductsSortByFilter.css";
import { useProduct } from "../../context/Shop/Products/ProductsContext";

const ProductsSortByFilter = ({ sortByFilters, handleSortByInputChange }) => {
  const { queryParameters } = useProduct();

  return (
    <div className="products-sort-by-filter">
      <div className="sort-by">
        <label htmlFor="price-sort">Sort by Price:</label>
        <select
          id="price-sort"
          name="price"
          value={sortByFilters.price}
          onChange={(e) => {
            handleSortByInputChange(e);
            // handleSortByPrice(e.target.value);
          }}
        >
          <option value="" disabled>
            Select
          </option>
          <option value="asc" selected={queryParameters.price === "asc"}>
            Price: Low to High
          </option>
          <option value="desc" selected={queryParameters.price === "desc"}>
            Price: High to Low
          </option>
        </select>
      </div>
      {/* <div className="sort-by">
        <label htmlFor="rating-sort">Sort by Rating:</label>
        <select
          id="rating-sort"
          name="rating"
          value={filters.rating}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="asc">Rating: Low to High</option>
          <option value="desc">Rating: High to Low</option>
        </select>
      </div> */}
      <div className="filter">
        <label htmlFor="min-price">Min Price: $</label>
        <input
          type="number"
          id="min-price"
          name="minPrice"
          min={0}
          value={sortByFilters.minPrice}
          onChange={handleSortByInputChange}
        />
      </div>
      <div className="filter">
        <label htmlFor="max-price">Max Price: $</label>
        <input
          type="number"
          id="max-price"
          name="maxPrice"
          value={sortByFilters.maxPrice}
          onChange={handleSortByInputChange}
        />
      </div>
      {/* <div className="filter">
        <label htmlFor="min-rating">Min Rating:</label>
        <input
          type="number"
          id="min-rating"
          name="minRating"
          value={filters.minRating}
          onChange={handleInputChange}
        />
      </div>
      <div className="filter">
        <label htmlFor="max-rating">Max Rating:</label>
        <input
          type="number"
          id="max-rating"
          name="maxRating"
          value={filters.maxRating}
          onChange={handleInputChange}
        />
      </div> */}
    </div>
  );
};

export default ProductsSortByFilter;
