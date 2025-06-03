import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain p-4" />
      <div className="p-4">
        <h2 className="text-md font-semibold mb-1 line-clamp-1">{product.title}</h2>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <div className="mt-2 font-bold text-blue-600">${product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
