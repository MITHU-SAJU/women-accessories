import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row gy-5">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-12 text-center text-lg-start">
            <h2 className="footer-logo">Yaal's Elegance</h2>
            <p className="footer-about mx-auto mx-lg-0">
              Celebrating heritage and elevating the modern woman through
              timeless splendor.
            </p>
          </div>

          {/* Links: The House */}
          <div className="col-lg-2 col-md-4 text-center text-lg-start">
            <h5>The House</h5>
            <ul>
              <li><Link to="/">Our Story</Link></li>
              <li><Link to="/">Craftsmanship</Link></li>
              <li><Link to="/">Sustainability</Link></li>
            </ul>
          </div>

          {/* Links: Client Care */}
          <div className="col-lg-2 col-md-4 text-center text-lg-start">
            <h5>Client Care</h5>
            <ul>
              <li><Link to="/">Contact</Link></li>
              <li><Link to="/">Shipping</Link></li>
              <li><Link to="/">Returns</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-4 text-center text-lg-start">
            <h5>Yaal's Elegance</h5>
            <p>Join our inner circle for exclusive previews.</p>
            <div className="newsletter-box mx-auto mx-lg-0">
              <input type="email" placeholder="Email Address" aria-label="Email Address" />
              <button type="button">Join</button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3">
          <span>© 2026 Yaal's Elegance</span>
          <div className="footer-links d-flex justify-content-center gap-4">
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
