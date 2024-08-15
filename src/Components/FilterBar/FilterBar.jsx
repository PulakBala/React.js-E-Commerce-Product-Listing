// src/Components/FilterBar.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FilterBar = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [inStock, setInStock] = useState(true);

  const handleFilterChange = () => {
    onFilter({ category, priceRange, inStock });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => { setCategory(e.target.value); handleFilterChange(); }}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">All Categories</option>
          <option value="electronics">Jewellery</option>
          <option value="jewelery">Electronics</option>
          {/* <option value="fashion">Fashion</option> */}

          {/* Add more options as needed */}
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">Price Range</label>
        <select
          id="priceRange"
          value={priceRange}
          onChange={(e) => { setPriceRange(e.target.value); handleFilterChange(); }}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">All Prices</option>
          <option value="0-50">$0 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101-200">$101 - $200</option>
          <option value="201-500">$201 - $500</option>
          {/* Add more ranges as needed */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Availability</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => { setInStock(e.target.checked); handleFilterChange(); }}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="inStock" className="ml-2 text-sm text-gray-600">In Stock</label>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
FilterBar.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterBar;
