// src/Components/ProductList/ProductList.jsx
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../Services/api";
import ProductCard from "../ProductCard/ProductCard";
import PropTypes from 'prop-types';

const ProductList = ({searchQuery}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid'); // State to toggle between 'grid' and 'list'

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  // Filter products based on searchQuery
  const filteredProducts = products.filter(product =>
    product.title && typeof product.title === 'string' && 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <div className="flex justify-center gap-4 mb-4">
        <button 
          onClick={() => setView('grid')} 
          className={`px-4 py-2 border rounded ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          Grid View
        </button>
        <button 
          onClick={() => setView('list')} 
          className={`px-4 py-2 border rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          List View
        </button>
      </div>
      <div className={`flex flex-wrap gap-4 ${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'flex-col'}`}>
      {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

// PropTypes validation
ProductList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ProductList;