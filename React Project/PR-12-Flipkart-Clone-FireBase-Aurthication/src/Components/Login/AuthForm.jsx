import React, { useState } from "react";
import {
  Tab,
  Tabs,
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import "./auth.css";

const AuthForm = () => {
  const [key, setKey] = useState("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    console.log(`${key === "signin" ? "Signing in" : "Signing up"} with`, formData);
    // Backend login/signup logic here
  };

  return (
    <div className="auth-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="auth-card p-4 glass-effect">
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 justify-content-center"
            variant="pills"
          >
            <Tab eventKey="signin" title="Sign In">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="signinEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signinPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="signup" title="Sign Up">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="signupEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signupConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                <Button variant="success" type="submit" className="w-100">
                  Sign Up
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Card>
      </Container>
    </div>
  );
};

export default AuthForm;
