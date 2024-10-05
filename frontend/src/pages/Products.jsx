import React, { useEffect, useState, useRef } from "react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { FaFilter } from "react-icons/fa6";
import FilterComponent from "./Filter";
import ProductCard from "./ProductCard";

const Products = () => {
  const Filter = useParams(); // Example: { categoryName: "Rings", name: "Chain", price: 299, rating: 4 }
  console.log(Filter, "Test");
  const FilterData = Filter.categoryName ? [Filter.categoryName] : [];

  const [ProductsFilter, SetProductsFilter] = useState({
    categoryName: FilterData, // Initialize categoryName as an array
    price: [], // Assuming this is an array with [minPrice, maxPrice]
    rating: null,
    name: null,
  });

  const [filter, setFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const products = useSelector((state) => state.products.products); // Assuming products are coming from Redux state

  const filterRef = useRef(null); // Reference for the filter component

  const handlefilterChange = (newFilter) => {
    SetProductsFilter(newFilter);
  };

  // Handle closing the filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilter(false); // Close the filter when clicking outside of it
      }
    };

    if (filter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filter]);

  useEffect(() => {
    const filterProducts = () => {
      try {
        if (
          ProductsFilter.categoryName.length === 0 &&
          !ProductsFilter.name &&
          ProductsFilter.price.length === 0 &&
          !ProductsFilter.rating
        ) {
          setFilteredProducts(products);
          setLoading(false);
          return;
        }

        const filtered = products.filter((product) => {
          return (
            (!ProductsFilter.categoryName.length || // Check if categoryName filter is empty
              ProductsFilter.categoryName.includes(product?.categoryName)) && // Check if product's category is in the selected categories
            (!ProductsFilter.name ||
              product?.name
                ?.toLowerCase()
                .includes(ProductsFilter?.name?.toLowerCase())) &&
            (!ProductsFilter.price.length || // Ensure both min and max price are set
              (product?.price >= ProductsFilter.price[0] && // Check if the product price falls within the selected range
                product?.price <= ProductsFilter.price[1])) &&
            (!ProductsFilter.rating || product?.rating >= ProductsFilter.rating)
          );
        });

        setFilteredProducts(filtered);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    filterProducts();
  }, [ProductsFilter, products]);

  if (loading) return <Loading />;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="flex flex-row gap-8 w-full relative py-4 dark:bg-gray-900">
      {/* Filter Sidebar */}
      <div className="hidden lg:flex p-2 lg:p-4 lg:w-[20%] sticky top-2 max-h-[700px]">
        <FilterComponent
          ProductsFilter={ProductsFilter}
          handlefilterChange={handlefilterChange}
        />
      </div>

      {/* Mobile Filter Toggle */}
      <div className="flex lg:hidden p-2 ">
        <div
          className={`dark:text-gray-300 cursor-pointer ${
            filter ? "hidden" : "flex"
          }`}
          onClick={() => setFilter(true)}
        >
          <FaFilter size={20} />
        </div>
        {filter && (
          <div
            className="absolute z-50 w-[40%]"
            ref={filterRef} // Attach ref to the filter component
          >
            <FilterComponent
              ProductsFilter={ProductsFilter}
              handlefilterChange={handlefilterChange}
            />
          </div>
        )}
      </div>

      {/* Product List */}
      <div className="w-full lg:w-[70%] flex flex-wrap justify-items-start gap-4 lg:px-2 lg:py-4 dark:text-gray-300">
        {filteredProducts.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Layout(Products);
