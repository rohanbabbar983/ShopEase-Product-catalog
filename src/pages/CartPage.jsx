import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  clearCart,
  removeItemCompletely,
  selectCartItems,
} from "../store/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {loading ? (
        <ul className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <li
              key={i}
              className="flex items-center gap-4 bg-white p-4 rounded shadow animate-pulse"
            >
              <div className="w-20 h-20 bg-gray-200 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded" />
            </li>
          ))}
        </ul>
      ) : cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-32 h-32"
          />
          <h2 className="text-xl font-semibold text-gray-600">
            Your cart is feeling lonely!
          </h2>
          <p className="text-gray-500">Start adding some Amazing <span onClick={()=>navigate("/")} className="underline cursor-pointer text-blue-600">Products.</span></p>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="relative flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded shadow"
              >
                <button
                  className="absolute -top-5 -right-2 cursor-pointer text-black hover:text-black text-3xl font-bold"
                  onClick={() => dispatch(removeItemCompletely(item.id))}
                  title="Remove Product"
                >
                  &times;
                </button>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">
                    ${item.price} × {item.quantity}
                  </p>
                  <p className="text-blue-600 font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="px-2 py-1 cursor-pointer bg-gray-200 rounded text-lg"
                  >
                    –
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(addToCart({ ...item, quantity: 1 }))
                    }
                    className="px-2 py-1 cursor-pointer bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xl font-semibold text-center sm:text-left">
              Total: <span className="text-blue-700">${total}</span>
            </div>
            <div className="flex gap-4">
              <button className="cursor-pointer text-blue-600 hover:text-blue-700 px-4 py-2 rounded flex items-center gap-1 text-lg">
                Checkout
                <GoArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
