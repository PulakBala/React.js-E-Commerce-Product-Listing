// src/Components/ProductList/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-md bg-white">
      <img src={product.image} alt={product.title} className="w-full h-auto rounded-lg" />
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-600 mt-1">${product.price}</p>
    </div>
  );
};

export default ProductCard;

