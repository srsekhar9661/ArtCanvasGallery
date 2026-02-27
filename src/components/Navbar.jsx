import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-content">
        <h2 className="logo">ArtCanvasGallery</h2>

        <div className="nav-links">
          <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
          <Link className={location.pathname === "/gallery" ? "active" : ""} to="/gallery">Gallery</Link>
          <Link className={location.pathname === "/about" ? "active" : ""} to="/about">About</Link>
          <Link className={location.pathname === "/contact" ? "active" : ""} to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;