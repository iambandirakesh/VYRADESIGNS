import React, { useMemo, memo, useState } from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import Slider from "@mui/material/Slider";
import { CiStar } from "react-icons/ci";
// Utility function for debounce
const debounce = (func, delay) => {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};

const FilterComponent = memo(({ ProductsFilter, handlefilterChange }) => {
  const [value, setValue] = useState([0, 1000]);

  const categoryState = useSelector((state) => state.category.category);

  // Memoize the categories to avoid recalculating on every render
  const filteredCategories = useMemo(() => {
    const CategoryData = categoryState || [];
    return CategoryData.length > 0
      ? CategoryData.map((category) => ({
          ...category,
          isChecked: ProductsFilter.categoryName?.includes(category.name),
        }))
      : [];
  }, [categoryState, ProductsFilter.categoryName]);

  // Handle category change with optimized Set operations
  const handleRatingChange = (rating) => {
    if (rating === ProductsFilter.rating) {
      const updatedFilter = { ...ProductsFilter, rating: null };
      handlefilterChange(updatedFilter);
    } else {
      const updatedFilter = { ...ProductsFilter, rating: rating };
      handlefilterChange(updatedFilter);
    }
  };
  const handleCategoryChange = (categoryName) => {
    const updatedCategories = new Set(ProductsFilter.categoryName || []);
    if (updatedCategories.has(categoryName)) {
      updatedCategories.delete(categoryName);
    } else {
      updatedCategories.add(categoryName);
    }
    handlefilterChange({
      ...ProductsFilter,
      categoryName: Array.from(updatedCategories),
    });
  };

  // Handle slider change with debounce for performance optimization
  const handlePriceChange = debounce((event, newValue) => {
    let updatedFilters = { ...ProductsFilter, price: newValue };
    handlefilterChange(updatedFilters);
    setValue(newValue);
  }, 300);

  // Remove filters based on key (either category or price)
  const handleRemoveFilter = (key) => {
    if (key === "price") {
      let updatedFilters = { ...ProductsFilter, price: [] };
      handlefilterChange(updatedFilters);
    } else {
      let updatedFilters = { ...ProductsFilter, [key]: null };
      handlefilterChange(updatedFilters);
    }
  };

  const handleRemoveFilterCategory = (idx) => {
    console.log(idx);
    let updatedFilters = { ...ProductsFilter };
    console.log(ProductsFilter);
    updatedFilters.categoryName.splice(idx, 1);
    handlefilterChange(updatedFilters);
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-600 dark:text-gray-300 p-2 flex flex-col rounded">
      <div className="font-semibold text-lg lg:text-xl p-1">
        <div>Filters</div>
        <div className="flex w-full flex-wrap gap-2">
          {
            // Map over category filters
            ProductsFilter.categoryName?.map((value, idx) => {
              if (value === null) return null;
              return (
                <div
                  key={value}
                  className={`flex flex-row items-center text-[15px] w-[${
                    value.length * 10
                  }px] rounded bg-gray-400`}
                >
                  <RxCross2
                    className="translate-y-0.5 text-gray-600 cursor-pointer"
                    onClick={() => handleRemoveFilterCategory(idx)} // Remove filter when clicking the cross icon
                  />
                  <div className="text-ellipsis line-clamp-1">{value}</div>
                </div>
              );
            })
          }
          {
            // Map over other filters like price and others
            Object.entries(ProductsFilter).map(([key, value]) => {
              if (
                key === "categoryName" ||
                value === null ||
                value?.length === 0
              )
                return null;
              if (key === "price" && value.length > 0) {
                return (
                  <div
                    key={key}
                    className={`flex flex-row items-center text-[15px] w-${
                      value[0] === 0 ? 20 : 28
                    } rounded bg-gray-400`}
                  >
                    <RxCross2
                      className="translate-y-0.5 text-gray-600 cursor-pointer"
                      onClick={() => handleRemoveFilter(key)} // Remove filter when clicking the cross icon
                    />
                    <div>
                      {value[0]} - {value[1]}
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={key}
                  className={`flex flex-row items-center text-[15px] w-20 rounded bg-gray-400`}
                >
                  <RxCross2
                    className="translate-y-0.5 text-gray-600 cursor-pointer"
                    onClick={() => handleRemoveFilter(key)} // Remove filter when clicking the cross icon
                  />
                  <div>{value}</div>
                </div>
              );
            })
          }
        </div>
      </div>

      <hr size={20} />

      <div>
        <div className="font-semibold text-sm py-1 ">CATEGORIES</div>
        <div>
          <form className="flex flex-col gap-1 px-4">
            {/* Conditional rendering for category data */}
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div key={category._id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id={category._id}
                    name={category.name}
                    value={category.name}
                    checked={category.isChecked} // Use memoized checked value
                    onChange={() => handleCategoryChange(category.name)} // Handle category filter changes
                  />
                  <label htmlFor={category._id}>{category.name}</label>
                </div>
              ))
            ) : (
              <div>No categories available</div>
            )}
          </form>
        </div>
      </div>

      <div className="w-full flex flex-col gap-1 py-2">
        <div className="font-semibold text-sm ">PRICE RANGE</div>
        <div className="px-1">
          <Slider
            getAriaLabel={() => "Price range"}
            value={value}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
          />
        </div>
      </div>
      <div className="w-full flex-col gap-1 py-1">
        <div className="font-semibold text-sm ">CUSTOMER RATINGS</div>
        <form className="flex flex-col gap-1 px-4">
          {/* Conditional rendering for category data */}
          {[1, 2, 3, 4].map((rating) => (
            <div key={rating} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={rating}
                name={rating}
                value={rating}
                onChange={() => handleRatingChange(rating)}
                // Handle category filter changes
              />
              <label htmlFor={rating} className="flex flex-row">
                <div className="flex flex-row justify-start items-center">
                  <div>{rating}</div>
                  <CiStar />
                </div>
                <div>& Above</div>
              </label>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
});
export default FilterComponent;
