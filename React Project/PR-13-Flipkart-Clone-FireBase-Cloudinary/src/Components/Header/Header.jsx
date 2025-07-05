
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { BsCart3, BsBox2 } from "react-icons/bs";
import { IoSearchOutline, IoCardOutline } from "react-icons/io5";
import { LuDiamond } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { PiGiftLight } from "react-icons/pi";
import { FaSquarePlus } from "react-icons/fa6";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container } from 'react-bootstrap';

import FlipCardlogo from "../../assets/img/Flip_Card_logo.svg";
import LogoTwo from "../../assets/img/logo-2.png";
import { signOutAsync } from "../../Services/Actions/authAction";

import './Header.css';
import { ToastContainer } from 'react-toastify';

const Header = ({ setSearchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.productReducer);
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    dispatch(signOutAsync());
    navigate("/");
  };

  const textColor = isHomePage ? 'text-dark' : 'text-white';

  return (
    <header className={`header-container shadow-sm ${isHomePage ? 'bg-light' : 'bg-primary'} ${textColor}`}>
      <Container>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="header-top d-flex">
          <div className="logo-search">
            <Link to="/" className="logo pe-3">
              <img src={isHomePage ? FlipCardlogo : LogoTwo} alt="Flip_Card" />
            </Link>
            <div className="search-bar">
              <IoSearchOutline className="search-icon fs-5" />
              <input
                className="search-input"
                placeholder="Search for products, Brands and More"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="header-actions">
            <Navbar expand="md" variant="light">
              <Nav className={`d-flex flex-row align-items-start justify-content-center ${textColor}`}>

                {!isAuthenticated ? (
                  <Link to="/login" className={`d-flex align-items-center text-decoration-none mx-2 ${textColor}`}>
                    <CgProfile className='fs-5' />
                    <span className='ps-1'>Login</span>
                  </Link>
                ) : (
                  <NavDropdown
                    title={<span className={textColor}>{user?.email || "Account"}</span>}
                    menuVariant="dark"
                  >
                    <NavDropdown.Item><CgProfile /> My Profile</NavDropdown.Item>
                    <NavDropdown.Item><LuDiamond /> Flipkart Plus Zone</NavDropdown.Item>
                    <NavDropdown.Item><BsBox2 /> Orders</NavDropdown.Item>
                    <NavDropdown.Item><CiHeart /> Wishlist</NavDropdown.Item>
                    <NavDropdown.Item><PiGiftLight /> Rewards</NavDropdown.Item>
                    <NavDropdown.Item><IoCardOutline /> Gift Cards</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>🚪 Logout</NavDropdown.Item>
                  </NavDropdown>
                )}

                <Link to="/Add-To-Cart" className={`d-flex align-items-center text-decoration-none mx-2 position-relative ${textColor}`}>
                  <BsCart3 className='fs-5' />
                  <span className='ps-1'>Cart</span>
                  {cartItems.length > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-10px',
                        backgroundColor: '#157347',
                        color: 'white',
                        fontSize: '12px',
                        padding: '2px 6px',
                        borderRadius: '50%',
                        fontWeight: 'bold',
                      }}
                    >
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                {isAuthenticated && (
                  <Link to="/Add-Product" className={`d-flex align-items-center text-decoration-none mx-2 ${textColor}`}>
                    <FaSquarePlus className='fs-4' />
                    <span className='ps-1'>Add Product</span>
                  </Link>
                )}
              </Nav>
            </Navbar>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
