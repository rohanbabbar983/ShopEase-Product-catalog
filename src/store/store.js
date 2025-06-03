import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';
import cartReducer from './features/cartSlice';
import filterReducer from './features/filterSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
});
