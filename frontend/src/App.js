import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./Loading/Loading";
import { GetAllProducts } from "./apiCalls/Product";
import { setProducts } from "./Redux/ProductsSlice";
import { useDispatch } from "react-redux";
import { GetAllCategorys } from "./apiCalls/Category";
import { SetCategory } from "./Redux/CategorySlice";
import Register from "./AuthPages/Register";
import Login from "./AuthPages/Login";
import { GetUser } from "./apiCalls/User";
import { setUser } from "./Redux/UserSlice";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
function App() {
  const dispatch = useDispatch();
  const HomePage = lazy(() => import("./pages/HomePage"));
  const AdminHomePage = lazy(() => import("./pages/AdminHomePage"));
  const Products = lazy(() => import("./pages/Products"));
  const ProductInfo = lazy(() => import("./pages/ProductInfo"));
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await GetAllProducts();
      console.log(res.data);
      if (res.data.status) {
        dispatch(setProducts(res.data.data));
      }
      const categoryRes = await GetAllCategorys();
      if (categoryRes?.data) {
        dispatch(SetCategory(categoryRes.data));
      }
      const UserData = await GetUser();
      if (UserData?.data) {
        dispatch(setUser(UserData.data.data));
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading data={"main"} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductInfo />} />

            <Route path="/products/:categoryName" element={<Products />} />
            <Route path="/Admin" element={<AdminHomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
