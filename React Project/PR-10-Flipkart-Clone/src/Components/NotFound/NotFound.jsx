import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";
import "./NotFound.css"; 

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center py-5">
      <div className="not-found-icon mb-4">
        <FaSadTear size={80} className="text-primary" />
      </div>
      <h1 className="display-4">404 - Page Not Found</h1>
      <p className="lead">Oops! The page you’re looking for doesn’t exist.</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFound;
