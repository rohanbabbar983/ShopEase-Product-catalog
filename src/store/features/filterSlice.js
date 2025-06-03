import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    searchTerm: '',
    selectedCategory: 'All',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedCategory } = filterSlice.actions;

export const selectSearchTerm = (state) => state.filter.searchTerm;
export const selectSelectedCategory = (state) => state.filter.selectedCategory;

export default filterSlice.reducer;
