import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../store/features/cartSlice';
import { setSearchTerm } from '../store/features/filterSlice';
import { IoCart } from "react-icons/io5";
import { FiSearch } from "react-icons/fi"; 

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = cartItems.length;

  const onSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <nav className="bg-white shadow px-8 flex items-center h-[80px] z-50">
      <div className="container flex items-center justify-between flex-wrap gap-4">
        
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopEase
        </Link>

        {location.pathname === '/' && (
          <div className="relative w-full sm:w-1/2 hidden lg:block">
            <input
              type="text"
              placeholder="Search products..."
              onChange={onSearchChange}
              className="border px-3 py-2 pr-10 rounded-md shadow-sm w-full"
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          </div>
        )}

        <Link to="/cart" className="relative">
          <IoCart size={30} />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
