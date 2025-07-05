import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../Services/Actions/productAction';
import { BsCart3 } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import './ProductView.css';

const ProductView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productReducer);

  const product = products.find((p) => p.id === id);

  if (!product) return <p className="text-center m-5">Product not found.</p>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`Added "${product.name}" to cart`, {
      position: "top-right",
      autoClose: 2000,
    });

    // Optional: Delay navigation slightly to allow toast to show
    setTimeout(() => {
      navigate('/Add-To-Cart');
    }, 1500);
  };

  return (
    <>
    <ToastContainer/>
    <div className="container py-4 bg-white">
      <div className="row">
        {/* Left: Product Image */}
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid border p-3"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
          <div className="d-flex justify-content-center gap-2 mt-3">
            {[1, 2, 3].map((i) => (
              <img
              key={i}
                src={product.image}
                alt={`thumb${i}`}
                width={60}
                height={60}
                className="border p-1"
                />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="col-md-6">
          <h2>{product.name}</h2>

          <div className="d-flex align-items-center my-2">
            <span className="bg-success text-white px-2 py-1 rounded me-2 fw-semibold">
              {product.rating} <FaStar className="ms-1" />
            </span>
            <span className="text-muted">
              ({product.ratingCount?.toLocaleString()} Ratings)
            </span>
          </div>

          <p className="text-secondary mb-2">
            Category: <strong>{product.category}</strong>
          </p>
          <p className="text-muted">{product.description}</p>

          <div className="my-3">
            <span className="fs-3 fw-bold text-danger">₹{product.price}</span>
            <span className="text-muted text-decoration-line-through ms-3">
              ₹{product.price * 2}
            </span>
            <span className="text-success fw-semibold ms-2">50% off</span>
          </div>

          <button className="btn btn-warning me-3" onClick={handleAddToCart}>
            <BsCart3 className="me-2" /> Add to Cart
          </button>

          <Link to="/" className="btn btn-outline-secondary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
     </>
  );
};

export default ProductView;
