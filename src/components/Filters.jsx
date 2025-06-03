import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedCategory,
  selectSelectedCategory,
  setSearchTerm,
} from '../store/features/filterSlice';
import {
  selectAllProducts,
  selectProductsLoading,
} from '../store/features/productsSlice';
import { FiSearch } from 'react-icons/fi';

const Filters = () => {
  const dispatch = useDispatch();
  const selected = useSelector(selectSelectedCategory);
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductsLoading);

  const uniqueCategories = ['All', ...new Set(products.map((p) => p.category))];

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="mb-4 flex flex-col gap-4">

      <div className="block lg:hidden relative w-full sm:w-3/4 mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
          className="border px-3 py-2 pr-10 rounded-md shadow-sm w-full"
        />
        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
      </div>

      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="px-5 py-2 bg-gray-200 rounded-full animate-pulse w-20 h-6"
              ></div>
            ))
          : uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => dispatch(setSelectedCategory(cat))}
                className={`px-3 py-1 cursor-pointer rounded-full text-sm font-medium ${
                  selected === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
      </div>
    </div>
  );
};

export default Filters;
