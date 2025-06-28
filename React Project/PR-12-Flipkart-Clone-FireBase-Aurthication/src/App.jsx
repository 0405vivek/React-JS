
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AddProduct from './Components/AddProduct/AddProduct';
import EditProduct from './Components/EditProduct/EditProduct';
import AddToCart from './Components/AddToCart/AddToCart';
import Header from './Components/Header/Header';
import AllProducts from './Components/AllProductPage/AllProducts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductView from './Components/ViewProduct/ProductView';
import CategoryPage from './Components/SliderProduct/CategoryPage';
import NotFound from './Components/NotFound/NotFound';
import SignIn from './Components/Login/AuthForm';
import AuthForm from './Components/Login/AuthForm';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <AuthForm/>

      <Routes>
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/Add-Product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/Add-To-Cart" element={<AddToCart />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/allproducts" element={<AllProducts searchQuery={searchQuery} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
