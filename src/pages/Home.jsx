import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { StarFill } from "react-bootstrap-icons";
import ScrollSplitCard from "../components/ui/scroll-split-card";
import WhyChooseUsDemo from "../components/ui/why-choose-us-demo";
import heritage from "../assets/heritage.jpg";

const categories = [
  {
    id: 1,
    name: "Bridal Signature",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 2,
    name: "Heritage Gold",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 3,
    name: "Royal Pearl",
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a1a89c8a?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 4,
    name: "Classic Antique",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 5,
    name: "Bespoke Luxe",
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=300",
  },
];
const Home = () => {
  const navigate = useNavigate();
  return (
    <>


      {/* HERO SECTION */}
      <section className="hero-section container-fluid">
        {/* Floating Background */}
        <div className="floating-circle one"></div>
        <div className="floating-circle two"></div>

        <div className="container-fluid">
          <div className="row align-items-center min-vh-100">
            {/* LEFT CONTENT */}
            <div className="col-lg-3 hero-left">
              <div className="heritage-badge">
                <span></span>
                EST. 1924 HERITAGE
              </div>

              <h1 className="hero-title">
                Heritage of <br />
                <span>Elegance</span>
              </h1>

              <p className="hero-description">
                Discover a century of unparalleled craftsmanship. Each piece is
                a curated masterpiece bridging tradition with contemporary
                luxury.
              </p>

              <div className="hero-buttons">
                <button className="btn primary-btn" onClick={() => navigate("/products")}>Shop Collection</button>

                <button className="btn secondary-btn" onClick={() => navigate("/products")}>New Arrivals</button>
              </div>

              {/* Reviews */}
              <div className="review-box">
                <div className="review-users">
                  <img
                    src="https://randomuser.me/api/portraits/women/1.jpg"
                    alt=""
                  />
                  <img
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt=""
                  />
                </div>

                <div>
                  <div className="stars">
                    <StarFill />
                    <StarFill />
                    <StarFill />
                    <StarFill />
                    <StarFill />
                  </div>

                  <small>Trusted globally</small>
                </div>
              </div>
            </div>

            {/* CENTER IMAGE */}
            <div className="col-lg-6 text-center position-relative hero-center">
              <div className="image-glow"></div>

              <div className="hero-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
                  alt="Luxury Jewelry"
                  className="hero-image"
                />
              </div>

              {/* FLOATING CARD */}
              <div className="floating-card left-card">
                <small>CURATED</small>
                <h4>Best Seller</h4>
              </div>

              <div className="floating-card right-card">
                <small>JUST ARRIVED</small>
                <h4>Aura Luxe</h4>
              </div>
            </div>

            {/* RIGHT FEATURES */}
            <div className="col-lg-3 hero-right">
              <div className="feature-card">
                <h5>Heritage Craftsmanship</h5>
                <p>Centuries-old techniques passed through generations.</p>
              </div>

              <div className="feature-card">
                <h5>Ethical Sourcing</h5>
                <p>Conflict-free gems and responsibly sourced metals.</p>
              </div>

              <div className="feature-card">
                <h5>Handmade by Artisans</h5>
                <p>Every piece is hand-crafted with precision.</p>
              </div>

              <div className="feature-card">
                <h5>Lifetime Quality</h5>
                <p>Authenticity certificate and lifelong support.</p>
              </div>

              {/* STATS */}
              <div className="stats-box">
                <div>
                  <h3>15K+</h3>
                  <span>Patrons</span>
                </div>

                <div>
                  <h3>200+</h3>
                  <span>Designs</span>
                </div>

                <div>
                  <h3>4.9</h3>
                  <span>Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL SPLIT CARD */}
      <ScrollSplitCard
        imageSrc={heritage}
      cards={[
{
title: "Curated Premium Collections",
description:
"Explore a carefully selected range of elegant Jhumkas designed to complement every style, from traditional celebrations to modern fashion.",
bgColor: "#F8F4EF",
textColor: "#2D2D2D"
},
{
title: "Styles for Every Occasion",
description:
"Whether it's a wedding, festive gathering, office event, or casual outing, discover jewelry that perfectly completes your look.",
bgColor: "#C59A5D",
textColor: "#FFFFFF"
},
{
title: "Quality You Can Trust",
description:
"Shop with confidence from a collection chosen for its beauty, craftsmanship, and lasting appeal, delivered directly to your doorstep.",
bgColor: "#1A1715",
textColor: "#FFFFFF"
}
]}

      />

      {/* MAISON COLLECTIONS SECTION */}
      <section className="categories-section py-5">
        <div className="container-fluid px-lg-5 px-4 text-center">
          <div className="heritage-badge mb-3">
            <span></span>
            DISCOVER THE MAISON
          </div>
          <h2 className="section-title mb-3">Maison Collections</h2>
          <p className="section-subtitle mx-auto mb-5">
            Swipe left or right to explore our core categories.
          </p>

          <div className="categories-wrapper">
            <div className="categories-row">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="category-circle-card"
                  onClick={() => navigate(`/products?category=${encodeURIComponent(category.name)}`)}
                >
                  <div className="circle-image-wrapper shadow-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="circle-image"
                    />
                    <div className="circle-overlay">
                      <span className="circle-overlay-text">Explore</span>
                    </div>
                  </div>
                  <h4 className="category-name mt-3">{category.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <WhyChooseUsDemo />


    </>
  );
};

export default Home;
