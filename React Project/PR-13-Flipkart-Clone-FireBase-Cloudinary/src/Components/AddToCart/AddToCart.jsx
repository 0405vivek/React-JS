// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getCartItems,
//   removeFromCart,
//   increaseQty,
//   decreaseQty,
// } from "../../Services/Actions/productAction";
// import "./addtocart.css";
// import { Button, Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import done from "../../assets/img/done.jpeg";

// const AddToCart = () => {
//   const { cartItems } = useSelector((state) => state.productReducer);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     dispatch(getCartItems());
//   }, [dispatch]);

//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + item.quantity * Number(item.price),
//     0
//   );

//   const handlePlaceOrder = () => {
//     setShowModal(true);
//   };

//   const handleDone = () => {
//     setShowModal(false);
//     navigate("/");
//   };

//   return (
//     <div className="cart-container">
//       {cartItems.length === 0 ? (
//         <div className="empty-cart">
//           <h2 className="cart-heading">Your Shopping Cart</h2>
//           <p>Your cart is empty</p>
//           <Button
//             variant="primary"
//             className="shop-now-btn"
//             onClick={() => navigate("/")}
//           >
//             Shop Now
//           </Button>
          
//         </div>
//       ) : (
//         <>
//           <div className="cart-items">
//             {cartItems.map((product) => (
//               <div key={product.id} className="cart-card">
//                 <div className="cart-image-container">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="cart-image"
//                   />
//                   <div className="quick-view">Quick View</div>
//                 </div>

//                 <div className="cart-details">
//                   <h4>{product.name}</h4>
//                   <p className="text-muted">
//                     {/* {product.desc.length > 180
//                       ? product.desc.slice(0, 180) + "..."
//                       : product.desc} */}
//                   </p>
//                   <p>
//                     <strong>Category:</strong> {product.category}
//                   </p>
//                   <p className="price">
//                     <strong>Price:</strong> ₹{product.price}
//                   </p>
//                   <div className="quantity-controls">
//                     <Button
//                       variant="outline-success"
//                       onClick={() => dispatch(decreaseQty(product.id))}
//                       className="qty-btn"
//                     >
//                       −
//                     </Button>
//                     <span className="qty-value">{product.quantity}</span>
//                     <Button
//                       variant="outline-success"
//                       onClick={() => dispatch(increaseQty(product.id))}
//                       className="qty-btn"
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="cart-actions">
//                   <button className="save-btn" onClick={() => {}}>
//                     SAVE FOR LATER
//                   </button>
//                   <button
//                     className="remove-btn"
//                     onClick={() => dispatch(removeFromCart(product.id))}
//                   >
//                     REMOVE
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="cart-summary">
//             <div className="summary-header">
//               <h5>PRICE DETAILS</h5>
//             </div>
//             <div className="summary-body">
//               <div className="summary-items">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="summary-row">
//                     <span>
//                       {item.name} x {item.quantity}
//                     </span>
//                     <span>₹{item.quantity * Number(item.price)}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="summary-row discount-row">
//                 <span>Discount</span>
//                 <span className="discount">
//                   -₹{(totalAmount * 0.1).toFixed(2)}
//                 </span>
//               </div>
//               <div className="summary-row delivery-row">
//                 <span>Delivery Charges</span>
//                 <span className="delivery">FREE</span>
//               </div>
//               <hr className="summary-divider" />
//               <div className="summary-total">
//                 <span>Total Amount</span>
//                 <span>₹{(totalAmount * 0.9).toFixed(2)}</span>
//               </div>
//             </div>
//             <div className="summary-footer">
//               <p>
//                 You will save ₹{(totalAmount * 0.1).toFixed(2)} on this order
//               </p>
//             </div>
//             <Button
//               variant="warning"
//               className="checkout-btn py-2"
//               onClick={handlePlaceOrder}
//             >
//               PLACE ORDER
//             </Button>
//           </div>
//         </>
//       )}

//       <Modal show={showModal} onHide={handleDone} centered>
//         <Modal.Body className="text-center p-5">
//           <img
//             src={done}
//             alt="Success"
//             style={{ width: "80px", marginBottom: "20px" }}
//           />
//           <h4 className="mb-3">Order Placed Successfully!</h4>
//           <Button variant="success" onClick={handleDone}>
//             Done
//           </Button>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default AddToCart;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartItems,
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../../Services/Actions/productAction";
import "./addtocart.css";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import done from "../../assets/img/done.jpeg";

const AddToCart = () => {
  const { cartItems } = useSelector((state) => state.productReducer);
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * Number(item.price),
    0
  );

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    setShowModal(true);
  };

  const handleDone = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="cart-container">
       {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2 className="cart-heading">Your Shopping Cart</h2>
          <p>Your cart is empty</p>
          <Button
            variant="primary"
            className="shop-now-btn"
            onClick={() => navigate("/")}
          >
            Shop Now
          </Button>
          
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((product) => (
              <div key={product.id} className="cart-card">
                <div className="cart-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cart-image"
                  />
                  <div className="quick-view">Quick View</div>
                </div>

                <div className="cart-details">
                  <h4>{product.name}</h4>
                  <p className="text-muted">
                    {/* {product.desc.length > 180
                      ? product.desc.slice(0, 180) + "..."
                      : product.desc} */}
                  </p>
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p className="price">
                    <strong>Price:</strong> ₹{product.price}
                  </p>
                  <div className="quantity-controls">
                    <Button
                      variant="outline-success"
                      onClick={() => dispatch(decreaseQty(product.id))}
                      className="qty-btn"
                    >
                      −
                    </Button>
                    <span className="qty-value">{product.quantity}</span>
                    <Button
                      variant="outline-success"
                      onClick={() => dispatch(increaseQty(product.id))}
                      className="qty-btn"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="cart-actions">
                  <button className="save-btn" onClick={() => {}}>
                    SAVE FOR LATER
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeFromCart(product.id))}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-header">
              <h5>PRICE DETAILS</h5>
            </div>
            <div className="summary-body">
              <div className="summary-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-row">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹{item.quantity * Number(item.price)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-row discount-row">
                <span>Discount</span>
                <span className="discount">
                  -₹{(totalAmount * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="summary-row delivery-row">
                <span>Delivery Charges</span>
                <span className="delivery">FREE</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-total">
                <span>Total Amount</span>
                <span>₹{(totalAmount * 0.9).toFixed(2)}</span>
              </div>
            </div>
            <div className="summary-footer">
              <p>
                You will save ₹{(totalAmount * 0.1).toFixed(2)} on this order
              </p>
            </div>
            <Button
              variant="warning"
              className="checkout-btn py-2"
              onClick={handlePlaceOrder}
            >
              PLACE ORDER
            </Button>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={handleDone} centered>
        <Modal.Body className="text-center p-5">
          <img
            src={done}
            alt="Success"
            style={{ width: "80px", marginBottom: "20px" }}
          />
          <h4 className="mb-3">Order Placed Successfully!</h4>
          <Button variant="success" onClick={handleDone}>
            Done
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddToCart;
