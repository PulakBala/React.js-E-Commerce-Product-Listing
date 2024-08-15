// components/SortOptions/SortOptions.jsx
import React from 'react';

const SortOptions = ({ onSort }) => {
  return (
    <select onChange={(e) => onSort(e.target.value)}>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A to Z</option>
      <option value="name-desc">Name: Z to A</option>
      {/* Add more sorting options if needed */}
    </select>
  );
};

export default SortOptions;
