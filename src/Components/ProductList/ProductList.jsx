// src/Components/ProductList/ProductList.jsx
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../Services/api";
import ProductCard from "../ProductCard/ProductCard";
import PropTypes from 'prop-types';
import FilterBar from "../FilterBar/FilterBar";
import SortOptions from "../SortOptions/SortOptons";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid'); // State to toggle between 'grid' and 'list'
  const [filters, setFilters] = useState({ category: '', priceRange: '', inStock: true });
  const [sortOrder, setSortOrder] = useState('price-asc');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    // Filter products based on searchQuery and filters
    const result = products.filter(product => {
      const matchesQuery = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filters.category ? product.category === filters.category : true;
      const matchesPriceRange = filters.priceRange
        ? product.price >= parseFloat(filters.priceRange.split('-')[0])
          && product.price <= parseFloat(filters.priceRange.split('-')[1])
        : true;
      const matchesStock = filters.inStock ? product.rating && product.rating.count > 0 : true;

      return matchesQuery && matchesCategory && matchesPriceRange && matchesStock;
    });

    // Sort filtered products based on sortOrder
    const sortedProducts = [...result].sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredProducts(sortedProducts);
  }, [searchQuery, filters, sortOrder, products]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <FilterBar onFilter={setFilters} />
      <div className="flex justify-between items-center mb-4">
        <SortOptions onSort={setSortOrder} />
        <div className="flex gap-4">
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
