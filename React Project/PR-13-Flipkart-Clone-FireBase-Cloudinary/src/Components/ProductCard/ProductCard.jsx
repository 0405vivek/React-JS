
import React from "react";
import { FaEye, FaStar } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductCard.css";

const ProductScrollList = ({
  filteredProducts,
  handleCategoryClick,
  handleDelete,
  handleEdit,
  handleAddToCart,
  navigate,
}) => {
  const handleAdd = (e, product) => {
    e.stopPropagation();
    handleAddToCart(product);
    toast.success(`Added "${product.name}" to cart`);
  };

  const handleRemove = (e, id, name) => {
    e.stopPropagation();
    handleDelete(id);
    toast.info(`Deleted "${name}"`);
  };

  return (
    <div className="bg-white py-4 my-2 mx-2">
      <div className="horizontal-scroll d-flex justify-content-center align-items-center flex-wrap">
        {filteredProducts.map((product) => (
          <div
            className="product-card-modern"
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="modern-card-image">
              <img
                src={product.image}
                alt={product.name}
                className="modern-product-image"
              />
              <div className="modern-hover-action">
                <button
                  className="modern-action-btn delete"
                  onClick={(e) => handleRemove(e, product.id, product.name)}
                  title="Delete"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
                <button
                  className="modern-action-btn view"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                  title="View"
                >
                  <FaEye />
                </button>
                <button
                  className="modern-action-btn edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(product.id, e);
                  }}
                  title="Edit"
                >
                  <BsPencilSquare />
                </button>
              </div>
            </div>
            <div className="modern-card-details">
              <h6 className="modern-product-title">{product.name}</h6>
              <div className="modern-product-rating">
                <span>{product.rating || "4.2"}</span>
                <FaStar />
              </div>
              <p className="modern-product-price">₹{product.price}</p>
              <button
                className="modern-add-to-cart"
                onClick={(e) => handleAdd(e, product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductScrollList;
