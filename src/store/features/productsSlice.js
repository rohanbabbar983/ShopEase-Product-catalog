import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productsData from '../../data/products.json';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  await delay(1500); // delay for loading simulation.
  return productsData;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectAllProducts = (state) => state.products.products;
export const selectProductsLoading = (state) => state.products.loading;

export default productsSlice.reducer;
