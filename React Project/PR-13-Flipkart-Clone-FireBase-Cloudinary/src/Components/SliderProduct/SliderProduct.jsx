import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';

import Slider_1 from "../../assets/img/Slider-1.webp";
import Slider_2 from "../../assets/img/Slider-2.webp";
import Slider_3 from "../../assets/img/Slider-3.webp";
import Slider_4 from "../../assets/img/Slider-4.webp";
import Slider_5 from "../../assets/img/Slider-5.webp";
import Slider_6 from "../../assets/img/Slider-6.webp";
import Slider_7 from "../../assets/img/Slider-7.webp";
import Slider_8 from "../../assets/img/Slider-8.webp";

import './SliderProduct.css';


const slides = [
  { image: Slider_1, category: 'electronics' },
  { image: Slider_2, category: 'fashion' },
  { image: Slider_3, category: 'mobiles' },
  { image: Slider_4, category: 'home' },
  { image: Slider_5, category: 'kitchen' },
  { image: Slider_6, category: 'grocery' },
  { image: Slider_7, category: 'furniture' },
  { image: Slider_8, category: 'toys' },
];

function SliderProduct() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <Carousel className="slider-items">
      {slides.map((slide, index) => (
        <Carousel.Item key={index} interval={2000}>
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="d-block w-100"
            style={{ cursor: 'pointer' }}
            onClick={() => handleClick(slide.category)}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default SliderProduct;
