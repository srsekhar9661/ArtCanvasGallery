import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      {" "}
      {/* Added class here */}
      <div className="footer-container">
        {" "}
        {/* Added class here */}
        {/* About Section (Matches your CSS .footer-about) */}
        <div className="footer-about">
          <h2>Directional Works</h2>
          <p>
            The source of inspiration for my creative artworks has always been
            the material world that I see and the dreams that appear in my mind
          </p>
          <div className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
        {/* General Links */}
        <div className="footer-links">
          <h4>General</h4>
          <ul>
            <li><Link to="/gallery">Gallery</Link></li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        {/* Social Links */}
        <div className="footer-links">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>
        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact Info</h4>
          <p>Near to ESIL Metro station</p>
          <p>+91 9876543210</p>
          <p>directionalworks@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Directional works. all rights reserved.</p>
        <a href="#">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
