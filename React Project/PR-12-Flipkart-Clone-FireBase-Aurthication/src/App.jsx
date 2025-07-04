import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthState } from "./Services/Actions/authAction";

import Home from "./Components/Home";
import AddProduct from "./Components/AddProduct/AddProduct";
import EditProduct from "./Components/EditProduct/EditProduct";
import AddToCart from "./Components/AddToCart/AddToCart";
import Header from "./Components/Header/Header";
import AllProducts from "./Components/AllProductPage/AllProducts";
import ProductView from "./Components/ViewProduct/ProductView";
import CategoryPage from "./Components/SliderProduct/CategoryPage";
import NotFound from "./Components/NotFound/NotFound";
import AuthForm from "./Components/Login/AuthForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route
          path="/Add-Product"
          element={
            isAuthenticated ? <AddProduct /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route
          path="/Add-To-Cart"
          element={
            isAuthenticated ? <AddToCart /> : <Navigate to="/login" replace />
          }
        />

        <Route path="/product/:id" element={<ProductView />} />
        <Route
          path="/allproducts"
          element={<AllProducts searchQuery={searchQuery} />}
        />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
