// NotFound.js
import React from "react";

const NotFound = () => (
  <div style={{
    textAlign: "center",
    padding: "60px 20px",
    fontFamily: "serif"
  }}>
    <div style={{ fontSize: "200px", fontWeight: "bold", position: "relative", color: "#222" }}>
      4
      <span style={{ 
        color: "#ff4d4f", 
        position: "relative"
      }}>
        0
        {/* Chef Hat SVG or Image */}
        <span style={{
          position: "absolute",
          top: "-60px",
          left: "50%",
          transform: "translateX(-50%)"
        }}>
          {/* Replace with your SVG or <img src="chef-hat.png" /> */}
          <svg width="60" height="40" viewBox="0 0 60 40">
            <ellipse cx="30" cy="20" rx="25" ry="15" fill="#fff" stroke="#222" strokeWidth="2"/>
            <ellipse cx="20" cy="15" rx="8" ry="8" fill="#fff" stroke="#222" strokeWidth="2"/>
            <ellipse cx="40" cy="10" rx="10" ry="10" fill="#fff" stroke="#222" strokeWidth="2"/>
            <rect x="23" y="25" width="14" height="10" fill="#fff" stroke="#222" strokeWidth="2"/>
            <line x1="25" y1="35" x2="25" y2="40" stroke="#222" strokeWidth="2"/>
            <line x1="35" y1="35" x2="35" y2="40" stroke="#222" strokeWidth="2"/>
          </svg>
        </span>
      </span>
      4
    </div>
    <h2 style={{ fontSize: "2.5rem", margin: "30px 0 10px" }}>
      Oops, This Page Is Not Found
    </h2>
    <p style={{ color: "#555", marginBottom: "30px" }}>
      The page you are looking for doesn't exist. Please try searching for some other page, or return to the website's homepage to find what you're looking for.
    </p>
    <a href="/" style={{
      display: "inline-block",
      background: "#ff4d4f",
      color: "#fff",
      padding: "16px 36px",
      borderRadius: "30px",
      fontWeight: "bold",
      textDecoration: "none",
      fontSize: "1.2rem"
    }}>
      Back To Home
    </a>
  </div>
);

export default NotFound;
