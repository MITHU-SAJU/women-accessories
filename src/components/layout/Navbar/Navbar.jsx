import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Person, Bag } from "react-bootstrap-icons";
import { useApp } from "../../../context/AppContext";
import CartDrawer from "../../ui/CartDrawer";
import "./Navbar.css";

function Navbar() {
  const { cart, adminAuth } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="navbar navbar-expand-lg luxury-navbar fixed-top">
        <div className="container-fluid px-lg-5 px-4 d-flex align-items-center justify-content-between">
          
          {/* Hamburger Toggler for Mobile */}
          <button
            className="navbar-toggler custom-toggler order-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#luxuryNavbarContent"
            aria-controls="luxuryNavbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Logo / Brand (centered on desktop) */}
          <Link className="navbar-brand logo-center order-lg-2 order-2 mx-lg-auto" to="/">
            <h2>JHUMKA</h2>
          </Link>

          {/* Collapsible Content */}
          <div className="collapse navbar-collapse order-lg-1 order-3" id="luxuryNavbarContent">
            {/* LEFT MENU */}
            <div className="navbar-nav nav-links gap-lg-5 gap-3 mt-3 mt-lg-0">
              <NavLink className="nav-link px-0" to="/">Home</NavLink>
              <NavLink className="nav-link px-0" to="/products">Shop</NavLink>
              <NavLink className="nav-link px-0" to="/products?category=Bridal">Bridal</NavLink>
              {adminAuth ? (
                <NavLink className="nav-link px-0" to="/admin" style={{ color: "#c9a87c", fontWeight: 600 }}>Dashboard</NavLink>
              ) : (
                <NavLink className="nav-link px-0" to="/admin">Admin</NavLink>
              )}
            </div>
          </div>

          {/* RIGHT ICONS */}
          <div className="d-flex align-items-center gap-4 order-lg-3 order-2 nav-icons-wrapper">
            <Link to="/products" className="nav-icon-link" aria-label="Favorites">
              <Heart className="nav-icon" />
            </Link>
            
            <Link to="/admin" className={`nav-icon-link ${adminAuth ? "active-admin" : ""}`} aria-label="Admin Profile">
              <Person className="nav-icon" />
            </Link>

            <div className="bag-wrapper" onClick={() => setIsCartOpen(true)} role="button" aria-label="Open cart">
              <Bag className="nav-icon" />
              {cartItemsCount > 0 && (
                <span className="bag-count">{cartItemsCount}</span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;
