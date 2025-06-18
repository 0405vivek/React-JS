import food1 from "../assets/food1.jpg"; // Replace with your actual image paths
import food2 from "../assets/food.jpg";

import bgImage from "../assets/BG-img.png"
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Banner.css";

const Banner = () => {
  return (
    <section
      className="banner"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="banner-content">
            <span className="banner-accent">Best Taste</span>
            <h1 className="banner-title">
              Healthy &<br />Tasty food.
            </h1>
            <p className="banner-desc">
              Delight in the world of delectable, healthful cuisine that thrills your taste buds while feeding your body – welcome to the universe of Nutritious & Tasty food!
            </p>
            <button className="banner-btn">Get Menu</button>
          </Col>
          <Col md={6} className="banner-images">
            <div className="banner-img-circle">
              <img src={food1} alt="Sushi" />
              <div className="circle-text">
                FIND YOUR DREAM PLANTS FOR BEST HOME INTERIOR
              </div>
            </div>
            <img src={food2} alt="Kebab Plate" className="banner-img-rect" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
