import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/features/cartSlice";

const ProductModal = ({ product, isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
      setAdded(false);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const renderStars = () => {
    const fullStars = Math.floor(product.rating.rate);
    const halfStar = product.rating.rate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "½"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setAdded(true);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 lg:px-4">
      <div className="bg-white w-full h-full overflow-auto md:w-[80%] md:h-auto xl:max-w-3/4 xl:h-[80%] md:rounded-lg shadow-xl relative flex flex-col xl:flex-row">
        
        <button
          className="absolute top-2 right-4 cursor-pointer text-2xl font-bold text-gray-600 hover:text-black z-10"
          onClick={closeModal}
        >
          &times;
        </button>

        <div className="xl:w-1/2 w-full flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>

        <div className="xl:w-1/2 w-full p-6 flex flex-col justify-center">
          <div className="text-yellow-500 text-sm font-semibold mb-1 flex items-center gap-2">
            <span>{renderStars()}</span>
            <span className="text-gray-600 text-xs">
              ({product.rating.count} reviews)
            </span>
          </div>

          <h2 className="text-xl font-semibold mb-1">{product.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <p className="text-gray-700 text-sm mb-4">{product.description}</p>
          <div className="text-blue-600 font-bold text-lg mb-4">${product.price}</div>

          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium text-sm">Quantity:</span>
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="w-8 h-8 rounded cursor-pointer bg-gray-200 text-xl font-semibold"
            >
              –
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 cursor-pointer rounded bg-gray-200 text-xl font-semibold"
            >
              +
            </button>
          </div>

          <button
            disabled={added}
            className={`w-full py-2 cursor-pointer text-sm font-medium rounded ${
              added
                ? "bg-gray-300 text-gray-700 cursor-default"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={handleAddToCart}
          >
            {added ? "Added to Cart ✓" : `Add ${quantity} to Cart`}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductModal;
