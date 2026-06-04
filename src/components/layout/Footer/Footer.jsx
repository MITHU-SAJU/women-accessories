import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-4">
            <h2 className="footer-logo">JHUMKA</h2>
            <p className="footer-about">
              Celebrating heritage and elevating the modern woman through
              timeless splendor.
            </p>
          </div>

          <div className="col-lg-2 col-md-4">
            <h5>The House</h5>
            <ul>
              <li><Link to="/">Our Story</Link></li>
              <li><Link to="/">Craftsmanship</Link></li>
              <li><Link to="/">Sustainability</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4">
            <h5>Client Care</h5>
            <ul>
              <li><Link to="/">Contact</Link></li>
              <li><Link to="/">Shipping</Link></li>
              <li><Link to="/">Returns</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-4">
            <h5>Maison Jhumka</h5>
            <p>Join our inner circle for exclusive previews.</p>
            <div className="newsletter-box">
              <input type="email" placeholder="Email Address" aria-label="Email Address" />
              <button type="button">Join</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 JHUMKA</span>
          <div className="footer-links">
            <Link to="/">Privacy</Link>
            <Link to="/">Terms</Link>
            <Link to="/">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
