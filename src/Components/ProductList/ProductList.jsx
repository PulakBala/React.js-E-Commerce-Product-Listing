// src/Components/ProductList/ProductList.jsx
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../Services/api";
import ProductCard from "../ProductCard/ProductCard";


const ProductList = () => {
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
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
