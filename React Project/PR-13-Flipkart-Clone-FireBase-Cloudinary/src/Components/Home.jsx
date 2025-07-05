import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import {
  getAllProductsAsync,
  deleteProductAsync,
} from "../Services/Actions/productAction";
import TitleProduct from "./TitleProduact/TitleProduct";
import SliderProduct from "./SliderProduct/SliderProduct";
import "./Home.css";
import ProductScrollList from "./ProductCard/ProductCard";
import { addToCart } from "../Services/Actions/productAction";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Home = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productReducer);

  const [selectedPrice, setSelectedPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    filterProducts();
  }, [products, selectedPrice, searchQuery]);

  const filterProducts = () => {
    let updated = [...products];

    if (selectedPrice) {
      let [min, max] = selectedPrice.split("-").map(Number);
      if (isNaN(max)) max = Infinity;

      updated = updated.filter((p) => {
        const price = parseInt(p.price, 10);
        return price >= min && price <= max;
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      updated = updated.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.desc.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(updated);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductAsync(id));
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/edit-product/${id}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/allproducts?category=${encodeURIComponent(category)}`);
  };

  const handleAddToCart = (product) => {
  dispatch(addToCart(product));
};

  return (
    <>
      <ToastContainer />
    {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <TitleProduct />
      <SliderProduct />

      <div className="d-flex justify-content-end m-3">
        <select
          className="price-filter"
          onChange={(e) => setSelectedPrice(e.target.value)}
          value={selectedPrice}
        >
          <option value="">All Prices</option>
          <option value="0-1000">Less Than ₹1000</option>
          <option value="1000-5000">₹1000 - ₹5000</option>
          <option value="5000-10000">₹5000 - ₹10000</option>
          <option value="10000-15000">₹10000 - ₹15000</option>
          <option value="15000-20000">₹15000 - ₹20000</option>
          <option value="20000-">More Than ₹20000</option>
        </select>
      </div>

      <ProductScrollList
        filteredProducts={filteredProducts} 
        handleCategoryClick={(cat) => console.log("Filter:", cat)}
        handleDelete={(id) => dispatch(deleteProductAsync(id))}
        handleEdit={(id, e) => navigate(`/edit-product/${id}`)}
        handleAddToCart={(item) => dispatch(addToCart(item))}
        navigate={navigate}
      />
    </>
  );
};

export default Home;
