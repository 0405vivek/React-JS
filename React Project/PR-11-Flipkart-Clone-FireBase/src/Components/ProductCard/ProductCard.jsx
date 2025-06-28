import React from "react";
import { FaEye, FaStar } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import "./ProductCard.css"; // import the CSS for hover effect

const ProductScrollList = ({
  filteredProducts,
  handleCategoryClick,
  handleDelete,
  handleEdit,
  handleAddToCart,
  navigate,
}) => {
  return (
    <div className="bg-white py-4 my-2 mx-2">
      <div className="horizontal-scroll d-flex gap-3 px-2"
           style={{ gap: "20px", overflowX: "auto" }}>
        {filteredProducts.map((product) => (
          <div
            className="product-card border rounded shadow-sm p-2"
            key={product.id}
            onClick={() => handleCategoryClick(product.category)}
            style={{
              cursor: "pointer",
              width: "200px",
              position: "relative",
            }}
          >
            {/* Product Image + Hover Action Buttons */}
            <div className="image-wrapper position-relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-100"
                style={{ height: "150px", objectFit: "contain" }}
              />

              <div className="hover-action position-absolute top-0 end-0 p-1 d-flex flex-column gap-1">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(product.id);
                  }}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <FaEye />
                </button>
                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(product.id, e);
                  }}
                >
                  <BsPencilSquare />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-2 text-center">
              <h6 className="fw-semibold text-truncate mb-1">{product.name}</h6>

              {/* Flipkart-style Rating */}
              <div className="d-flex justify-content-center align-items-center">
                <span className="fs-5 fw-bold me-1">{product.rating || "4.2"}</span>
                <FaStar className="text-dark fs-6" />
              </div>

              {/* Price */}
              <p className="fw-bold text-primary mb-1 mt-2">₹{product.price}</p>

              {/* Add to Cart (Optional) */}
               <div className="d-grid">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductScrollList;
