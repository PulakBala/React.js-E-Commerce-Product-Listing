import { useState } from "react";

const ProductCard = ({ product, view }) => {
  const { image, title, price, description } = product;
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to truncate description to the first 20 words
  const getTruncatedDescription = (desc) => {
    const words = desc.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return desc;
  };

  return (
    <div
      className={`relative border border-gray-200 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 transition-transform transform ${view === 'grid' ? 'hover:scale-105' : ''} hover:shadow-xl hover:z-10 animate-glow`}
    >
      <img
        src={image}
        alt={title}
        className={`w-full ${view === 'grid' ? 'h-64 object-cover' : 'h-auto object-cover'} rounded-lg mb-2`}
      />
      <h2 className="text-lg font-semibold mt-2 text-gray-900 dark:text-gray-100">{title}</h2>
      <p className="text-gray-600 mt-1 dark:text-gray-300">${price}</p>
      <div className="text-gray-700 dark:text-gray-400 mt-2">
        <p className={`transition-all duration-300 ${!isExpanded ? 'line-clamp-4' : ''}`}>
          {isExpanded ? description : getTruncatedDescription(description)}
        </p>
        {description.split(' ').length > 20 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:underline mt-1"
          >
            {isExpanded ? ' Show Less' : ' See More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
