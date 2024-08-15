// components/FilterBar.js
import React, { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [inStock, setInStock] = useState(true);

  const handleFilterChange = () => {
    onFilter({ category, priceRange, inStock });
  };

  return (
    <div>
      {/* Add filter options for category, price range, and availability */}
      {/* Example: */}
      <select onChange={(e) => { setCategory(e.target.value); handleFilterChange(); }}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        {/* Add more options as needed */}
      </select>
      {/* Implement other filters similarly */}
    </div>
  );
};

export default FilterBar;
