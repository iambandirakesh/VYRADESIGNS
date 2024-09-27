import { createSlice } from "@reduxjs/toolkit";
export const FilterSlice = createSlice({
  name: "filter",
  initialState: {
    category: "",
    price: 0,
    rating: 0,
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
  },
});
export const { setCategoryFilter, setPrice, setRating } = FilterSlice.actions;
export default FilterSlice.reducer;
