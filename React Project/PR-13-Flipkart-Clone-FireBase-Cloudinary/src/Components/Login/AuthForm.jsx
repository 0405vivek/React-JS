import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signINAsync,
  signUpAsync,
  googleSignInAsync,
  checkAuthState,
  signOutAsync,
} from "../../Services/Actions/authAction";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Tab,
  Tabs,
} from "react-bootstrap";
import "./auth.css";
import login from "../../assets/img/login_img.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );

  const [key, setKey] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, error]);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Email and Password are required!");
      return;
    }
    dispatch(signINAsync({ email, password }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Email and Password are required to create an account!");
      return;
    }
    dispatch(signUpAsync({ email, password }));
  };

  const handleGoogleLogin = () => {
    dispatch(googleSignInAsync());
    toast.info("Redirecting to Google Sign In...");
  };

  const handleLogout = () => {
    dispatch(signOutAsync());
    toast.info("Logged out successfully!");
  };

  return (
    <Container fluid className="auth-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <Row className="auth-box shadow">
        {/* LEFT SIDE */}
        <Col md={5} className="auth-left p-4 text-white">
          <h3 className="fw-bold">Login</h3>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
          <img
            src={login}
            alt="login"
            className="img-fluid mt-auto login-image"
          />
        </Col>

        {/* RIGHT SIDE */}
        <Col
          md={7}
          className="auth-right d-flex flex-column justify-content-center p-4"
        >
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 auth-tabs"
          >
            <Tab eventKey="signin" title="Sign In">
              <Form onSubmit={handleSignIn}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="mb-2" style={{ fontSize: "12px" }}>
                  By continuing, you agree to Flipkart’s{" "}
                  <a href="#">Terms of Use</a> and{" "}
                  <a href="#">Privacy Policy</a>.
                </div>

                <Button
                  type="submit"
                  className="w-100 btn-orange fw-bold text-white mb-2"
                >
                  Login
                </Button>

                <Button
                  variant="danger"
                  className="w-100"
                  onClick={handleGoogleLogin}
                >
                  Sign in with Google
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="signup" title="Create Account">
              <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 btn-orange fw-bold text-white mb-2"
                >
                  Create Account
                </Button>

                <Button
                  variant="danger"
                  className="w-100"
                  onClick={handleGoogleLogin}
                >
                  Sign up with Google
                </Button>
              </Form>
            </Tab>
          </Tabs>

          {isAuthenticated && user && (
            <Alert variant="success" className="mt-3">
              Logged in as: {user.email}
              <Button
                variant="outline-dark"
                size="sm"
                className="ms-2"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Alert>
          )}

          <div className="mt-4 text-center">
            {key === "signin" ? (
              <span>
                New to Flipkart?{" "}
                <a href="#" onClick={() => setKey("signup")}>
                  Create an account
                </a>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <a href="#" onClick={() => setKey("signin")}>
                  Sign In
                </a>
              </span>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
