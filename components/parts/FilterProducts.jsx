import { useState, useEffect } from "react";

import useDebounce from "@/utils/debounce";

const FilterProducts = ({ onFilterHandler }) => {
  const [filterValues, setFilterValues] = useState({
    search: "",
    category: "",
  });

  const debouncedInputValue = useDebounce(filterValues?.search, 1000);

  useEffect(() => {
    const { search, category } = filterValues;
    if (search === "" && category === "") {
      onFilterHandler(null);
      return;
    }
    onFilterHandler(filterValues);
  }, [filterValues]);

  // useEffect handling search input
  // Only fire a search if the value has been entered for more than 1000ms.
  useEffect(() => {
    if (debouncedInputValue) {
      setFilterValues({ ...filterValues, search: debouncedInputValue });
    }
    if (debouncedInputValue === "") {
      setFilterValues({ ...filterValues, search: "" });
    }
  }, [debouncedInputValue]);

  // SEARCH - handle input change
  const searchHandler = (e) => {
    const { value } = e.target;
    setFilterValues({ ...filterValues, search: value });
  };

  // SEARCH - clear search
  const clearSearch = () => {
    setFilterValues({ ...filterValues, search: "" });
  };
  // CATEGORY - handle select change
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFilterValues({ ...filterValues, category: value });
  };
  // CATEGORY - clear category
  const clearCategory = () => {
    setFilterValues({ ...filterValues, category: "" });
  };

  // CLEAR ALL FILTERS
  const clearAllFilters = () => {
    setFilterValues({ search: "", category: "" });
  };

  return (
    <div className="mb-8 text-black">
      <p>Filter and search</p>
      <div className="flex ">
        <div className="mr-8">
          <label htmlFor="category" className="block font-bold mb-2">
            Select Category:
          </label>
          <select
            value={filterValues?.category}
            name="category"
            id="category"
            className="text-black"
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            <option value="bee">Bee</option>
            <option value="honey">Honey</option>
          </select>
          <button
            type="button"
            onClick={clearCategory}
            aria-label="Clear category select"
          >
            Clear category
          </button>
        </div>
        <div>
          <label htmlFor="search" className="block font-bold mb-2">
            Search products by title or description:
          </label>
          <input
            value={filterValues?.search}
            type="text"
            name="search"
            id="search"
            className="text-black"
            onChange={searchHandler}
            aria-label="Search products by name or description"
            placeholder="Search, ex 'honey' or 'bee'"
          />
          <button type="button" onClick={clearSearch} aria-label="Clear search">
            Clear search
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={clearAllFilters}
        aria-label="Clear all filters and search"
      >
        Clear all filters
      </button>
    </div>
  );
};
export default FilterProducts;
