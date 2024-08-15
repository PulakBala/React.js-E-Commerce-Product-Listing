import { useState, useEffect } from "react";
import { fetchProducts } from "../Services/api";
import ProductCard from "../ProductCard/ProductCard";
import PropTypes from 'prop-types';
import FilterBar from "../FilterBar/FilterBar";
import SortOptions from "../SortOptions/SortOptons";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

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
    <div className="flex flex-col md:flex-row">
      {/* Sidebar for mobile view */}
      <div className="md:hidden p-4 bg-gray-100 dark:bg-gray-900">
        <ThemeToggle />
        <FilterBar onFilter={setFilters} />
        <SortOptions onSort={setSortOrder} />
      </div>

      {/* Sidebar for larger screens */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto dark:bg-gray-900 dark:border-gray-700 hidden md:block">
        <ThemeToggle />
        <FilterBar onFilter={setFilters} />
        <SortOptions onSort={setSortOrder} />
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 md:ml-64">
        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          <div className="flex gap-4">
            <button 
              onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
              className={`px-4 py-2 border rounded ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            >
              {view === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
            </button>
          </div>
        </div>
        <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} view={view} />
            ))
          ) : (
            <p className="text-center col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
ProductList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ProductList;
