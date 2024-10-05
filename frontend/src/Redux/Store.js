import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import modeSlice from "./modeSlice";
import CategorySlice from "./CategorySlice";
import FilterSlice from "./FilterSlice";
import ProductsSlice from "./ProductsSlice";
import UserSlice from "./UserSlice";

// Create a persist config
const persistConfig = {
  key: "root",
  storage, // Use local storage as the storage mechanism
};

// Combine your reducers into a root reducer
const rootReducer = combineReducers({
  mode: modeSlice,
  category: CategorySlice,
  filter: FilterSlice,
  products: ProductsSlice,
  userData: UserSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const Store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
export const persistor = persistStore(Store);
