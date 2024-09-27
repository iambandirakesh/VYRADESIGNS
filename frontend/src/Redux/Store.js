import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./modeSlice";
import CategorySlice from "./CategorySlice";
import FilterSlice from "./FilterSlice";
import ProductsSlice from "./ProductsSlice";
export const Store = configureStore({
  reducer: {
    mode: modeSlice,
    category: CategorySlice,
    filter: FilterSlice,
    products: ProductsSlice,
  },
});
