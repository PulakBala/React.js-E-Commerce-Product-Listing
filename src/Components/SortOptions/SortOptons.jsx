
import PropTypes from 'prop-types';

const SortOptions = ({ onSort }) => {
  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="relative mt-4 max-w-xs mx-auto  dark:bg-gray-800 dark:border-gray-700">
      <select
        onChange={handleSortChange}
        className="dark:bg-gray-800 dark:border-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
        {/* Add more sorting options if needed */}
      </select>
    </div>
  );
};

// PropTypes validation
SortOptions.propTypes = {
  onSort: PropTypes.func.isRequired,
};

export default SortOptions;
