import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Heart, Person, Bag, List, X, Search, Whatsapp } from "react-bootstrap-icons";
import { useApp } from "../../../context/AppContext";
import CartDrawer from "../../ui/CartDrawer";
import "./Navbar.css";

const CATEGORIES = [
  "Bridal Signature",
  "Heritage Gold",
  "Royal Pearl",
  "Classic Antique",
  "Bespoke Luxe"
];

function Navbar() {
  const { cart, adminAuth, logoutAdmin } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Close sidebar on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent body scrolling when menu is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  // Close sidebar when URL location changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const handleSidebarSearchSubmit = (e) => {
    e.preventDefault();
    if (sidebarSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(sidebarSearch.trim())}`);
      setSidebarSearch("");
      setIsSidebarOpen(false);
    }
  };

  const handleSidebarCartClick = () => {
    setIsSidebarOpen(false);
    setIsCartOpen(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg luxury-navbar fixed-top">
        <div className="container-fluid px-lg-5 px-4 d-flex align-items-center justify-content-between">
          
          {/* Hamburger Toggler for Mobile/Tablet (<992px) */}
          <button
            className="navbar-toggler custom-toggler order-1 d-lg-none"
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation sidebar"
          >
            <List className="nav-icon" size={28} />
          </button>

          {/* Logo / Brand (Left on desktop, centered on mobile/tablet) */}
          <Link 
            className="navbar-brand logo-brand order-lg-1 order-2 mx-auto mx-lg-0" 
            to="/"
          >
            <h2>Yaal's Elegance</h2>
          </Link>

          {/* Centered links on Desktop (>=992px) */}
          <div className="collapse navbar-collapse d-none d-lg-flex order-lg-2 justify-content-center">
            <div className="navbar-nav nav-links gap-lg-5">
              <NavLink className="nav-link px-0" to="/">Home</NavLink>
              <NavLink className="nav-link px-0" to="/products">Shop</NavLink>
              <NavLink className="nav-link px-0" to="/products?category=Bridal">Bridal</NavLink>
              {adminAuth && (
                <NavLink className="nav-link px-0 text-gold" to="/admin">Dashboard</NavLink>
              )}
            </div>
          </div>

          {/* Right side icons on Desktop (>=992px) */}
          <div className="d-none d-lg-flex align-items-center gap-4 order-lg-3 nav-icons-wrapper">
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

          {/* Cart Icon for Mobile/Tablet (<992px) */}
          <div 
            className="d-lg-none order-3 nav-icon-mobile-wrapper" 
            onClick={() => setIsCartOpen(true)} 
            role="button" 
            aria-label="Open cart"
          >
            <div className="bag-wrapper">
              <Bag className="nav-icon" />
              {cartItemsCount > 0 && (
                <span className="bag-count">{cartItemsCount}</span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* OFF-CANVAS SIDEBAR DRAWER (Mobile & Tablet) */}
      <div className={`offcanvas-sidebar-backdrop ${isSidebarOpen ? "show" : ""}`} onClick={() => setIsSidebarOpen(false)}></div>
      
      <div className={`offcanvas-sidebar ${isSidebarOpen ? "show" : ""}`} role="dialog" aria-modal="true" aria-label="Navigation sidebar">
        <div className="sidebar-header">
          <span className="sidebar-brand">Yaal's Elegance</span>
          <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
            <X size={28} />
          </button>
        </div>

        <div className="sidebar-body">
          {/* Search bar inside sidebar */}
          <form className="sidebar-search-form mb-4" onSubmit={handleSidebarSearchSubmit}>
            <div className="sidebar-search-wrapper">
              <Search className="search-icon-sidebar" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                aria-label="Search catalog"
              />
            </div>
          </form>

          {/* Navigation Links */}
          <div className="sidebar-section mb-4">
            <h5 className="sidebar-section-title">Navigation</h5>
            <ul className="sidebar-menu-list">
              <li><NavLink className="sidebar-menu-link" to="/">Home Page</NavLink></li>
              <li><NavLink className="sidebar-menu-link" to="/products">All Products</NavLink></li>
              {adminAuth ? (
                <>
                  <li><NavLink className="sidebar-menu-link text-gold" to="/admin">Admin Dashboard</NavLink></li>
                  <li>
                    <button 
                      className="sidebar-menu-link logout-link-btn" 
                      onClick={() => { logoutAdmin(); setIsSidebarOpen(false); }}
                    >
                      Sign Out Portal
                    </button>
                  </li>
                </>
              ) : (
                <li><NavLink className="sidebar-menu-link" to="/admin">Administrative Login</NavLink></li>
              )}
            </ul>
          </div>

          {/* Categories Links */}
          <div className="sidebar-section mb-4">
            <h5 className="sidebar-section-title">Categories</h5>
            <ul className="sidebar-menu-list">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link 
                    className="sidebar-menu-link" 
                    to={`/products?category=${encodeURIComponent(cat)}`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions & Profiles */}
          <div className="sidebar-section mb-4">
            <h5 className="sidebar-section-title">Your Space</h5>
            <ul className="sidebar-menu-list">
              <li>
                <div className="sidebar-menu-link d-flex align-items-center justify-content-between" onClick={handleSidebarCartClick} role="button">
                  <span className="d-flex align-items-center gap-2">
                    <Bag size={18} /> Shopping Bag
                  </span>
                  <span className="badge rounded-pill bg-gold-badge">{cartItemsCount}</span>
                </div>
              </li>
              <li>
                <Link className="sidebar-menu-link d-flex align-items-center gap-2" to="/products">
                  <Heart size={18} /> Favorites List
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-footer">
          <span className="sidebar-footer-text">EST. 1924 HERITAGE</span>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;
