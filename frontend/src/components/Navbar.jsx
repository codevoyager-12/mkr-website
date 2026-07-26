import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        {/* Logo + Title */}
        <Link to="/" className="brand">
          <img
            src="/logo-mkr.png"
            alt="MKR Store Logo"
            className="logo-image"
          />

          <span className="logo-text">
            MKR <span>STORE</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/customize">Customize Plate</Link>
          <Link to="/cart">Cart ({cart.length})</Link>
        </div>

      </div>
    </nav>
  );
}