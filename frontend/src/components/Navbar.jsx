import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Logo + Title */}
        <Link to="/" className="brand" onClick={closeMobile}>
          <img
            src="/logo-mkr.png"
            alt="MKR Store Logo"
            className="logo-image"
          />

          <span className="logo-text">
            MKR <span>STORE</span>
          </span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className={`mobile-nav-toggle ${mobileOpen ? "open" : ""}`}
          onClick={toggleMobile}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${mobileOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMobile} className={location.pathname === "/" ? "active-link" : ""}>
            Home
          </Link>
          <Link to="/shop" onClick={closeMobile} className={location.pathname === "/shop" ? "active-link" : ""}>
            Shop
          </Link>
          <Link to="/customize" onClick={closeMobile} className={location.pathname === "/customize" ? "active-link" : ""}>
            Customize Plate
          </Link>
          <Link to="/cart" onClick={closeMobile} className={location.pathname === "/cart" ? "active-link" : ""}>
            Cart <span className="cart-badge-nav">{cart.length}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}