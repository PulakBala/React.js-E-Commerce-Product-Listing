// src/Components/ProductList/ProductCard.jsx


const ProductCard = ({ product }) => {
  const {image, title, price, description} = product;
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-md bg-white">
      <img src={image} alt={title} className="w-full h-auto rounded-lg" />
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-gray-600 mt-1">${price}</p>
      <p>{description}</p>
    </div>
  );
};

export default ProductCard;

