import { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Loading from "./Loading/Loading";
import AdminHomePage from "./pages/AdminHomePage";
import Products from "./pages/Products";
import ProductInfo from "./pages/ProductInfo";
function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading data={"main"} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/products/:categoryName" element={<Products />} />
            <Route path="/Admin" element={<AdminHomePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
