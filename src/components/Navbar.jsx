import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    // Route changes should close the menu without moving keyboard focus unexpectedly.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);
  const handleNavigation = () => {
    if (open) {
      setOpen(false);
      requestAnimationFrame(() => document.getElementById("main-content")?.focus());
    }
  };

  return (
    <header className="site-header">
      <nav className="container nav-content" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="Directional Works — Home" onClick={() => setOpen(false)}>
          <img className="brand-image" src="/images/directional-works-logo-transparent.png" alt="" width="64" height="64" />
        </Link>
        <button ref={menuButton} className="menu-toggle" type="button" aria-controls="site-links"
          aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}>
          <span /><span />
        </button>
        <div id="site-links" className={`nav-links ${open ? "is-open" : ""}`}>
          <NavLink to="/" end onClick={handleNavigation}>Home</NavLink>
          <NavLink to="/about" onClick={handleNavigation}>About</NavLink>
          <NavLink to="/services" onClick={handleNavigation}>Services</NavLink>
          <NavLink to="/gallery" onClick={handleNavigation}>Gallery</NavLink>
          <NavLink to="/collaborations" onClick={handleNavigation}>Collaborations</NavLink>
          <NavLink to="/contact" onClick={handleNavigation}>Contact</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;