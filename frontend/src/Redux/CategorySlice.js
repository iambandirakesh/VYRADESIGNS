import { createSlice } from "@reduxjs/toolkit";
export const CategorySlice = createSlice({
  name: "category",
  initialState: {
    category: {},
  },
  reducers: {
    SetCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { SetCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
