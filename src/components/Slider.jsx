import React, { useState, useEffect } from "react";
import "./Slider.css";
import { Link } from "react-router-dom";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "The Art of Nature",
      description: "Witness the silent masterpiece of the natural world.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", // Forest path
    },
    {
      id: 2,
      title: "Devotional Serenity",
      description: "Find peace in the sacred geometry of ancient temples.",
      image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073", // Peaceful temple/mountain
    },
    {
      id: 3,
      title: "Divine Landscapes",
      description: "Where heaven meets earth in perfect harmony.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", // Mountain range
    }
  ];

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})` }}
        >
          <div className="slide-content">
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <button className="explore-btn"><Link to="/gallery">Explore Now</Link></button>
          </div>
        </div>
      ))}
      
      {/* Navigation Dots */}
      <div className="dots">
        {slides.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentIndex ? "active-dot" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;