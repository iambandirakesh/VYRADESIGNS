import { createSlice } from "@reduxjs/toolkit";
export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    checkout: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCheckout: (state, action) => {
      state.checkout = action.payload;
    },
  },
});
export const { setProducts, setCheckout } = ProductSlice.actions;
export default ProductSlice.reducer;
