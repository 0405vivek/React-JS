// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signINAsync,
//   signUpAsync,
//   googleSignInAsync,
//   checkAuthState,
//   signOutAsync,
// } from "../../Services/Actions/authAction";
// import {
//   Container,
//   Form,
//   Button,
//   Tabs,
//   Tab,
//   Alert,
// } from "react-bootstrap";

// const AuthForm = () => {
//   const dispatch = useDispatch();
//   const { user, error, isAuthenticated } = useSelector((state) => state.authReducer);

//   const [key, setKey] = useState("signin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     dispatch(checkAuthState());
//   }, [dispatch]);

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     dispatch(signINAsync({ email, password }));
//   };

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     dispatch(signUpAsync({ email, password }));
//   };

//   const handleGoogleLogin = () => {
//     dispatch(googleSignInAsync());
//   };

//   const handleLogout = () => {
//     dispatch(signOutAsync());
//   };

//   return (
//     <Container className="p-4" style={{ maxWidth: "400px" }}>
//       <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
//         <Tab eventKey="signin" title="Sign In">
//           <Form onSubmit={handleSignIn}>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button type="submit" className="w-100 mb-2" variant="primary">
//               Sign In
//             </Button>
//             <Button className="w-100" variant="danger" onClick={handleGoogleLogin}>
//               Sign in with Google
//             </Button>
//           </Form>
//         </Tab>
//         <Tab eventKey="signup" title="Create Account">
//           <Form onSubmit={handleSignUp}>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button type="submit" className="w-100" variant="success">
//               Create Account
//             </Button>
//           </Form>
//         </Tab>
//       </Tabs>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {isAuthenticated && user && (
//         <Alert variant="success" className="mt-3">
//           Logged in as: {user.email}
//           <Button variant="outline-dark" size="sm" className="ms-2" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Alert>
//       )}
//     </Container>
//   );
// };

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

const AuthForm = () => {
  const dispatch = useDispatch();
  const { user, error, isAuthenticated } = useSelector((state) => state.authReducer);

  const [key, setKey] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signINAsync({ email, password }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUpAsync({ email, password }));
  };

  const handleGoogleLogin = () => {
    dispatch(googleSignInAsync());
  };

  const handleLogout = () => {
    dispatch(signOutAsync());
  };

  return (
    <Container fluid className="auth-container">
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
        <Col md={7} className="auth-right d-flex flex-column justify-content-center p-4">
          <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 auth-tabs">
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
                  <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
                </div>

                <Button type="submit" className="w-100 btn-orange fw-bold text-white mb-2">
                  Login
                </Button>

                <Button variant="danger" className="w-100" onClick={handleGoogleLogin}>
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

                <Button type="submit" className="w-100 btn-orange fw-bold text-white mb-2">
                  Create Account
                </Button>

                <Button variant="danger" className="w-100" onClick={handleGoogleLogin}>
                  Sign up with Google
                </Button>
              </Form>
            </Tab>
          </Tabs>

          {error && <Alert variant="danger" className="mt-2">{error}</Alert>}

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

