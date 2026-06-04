import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Whatsapp, BagPlus, StarFill, Funnel } from "react-bootstrap-icons";
import { useApp } from "../context/AppContext";
import "./Products.css";

const CATEGORIES = [
  "All",
  "Bridal Signature",
  "Heritage Gold",
  "Royal Pearl",
  "Classic Antique",
  "Bespoke Luxe"
];

function Products() {
  const { products, addToCart } = useApp();
  const [searchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [addedItemIds, setAddedItemIds] = useState({});

  // Sync category filter with query parameter if present
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      if (catParam.toLowerCase() === "bridal") {
        setSelectedCategory("Bridal Signature");
      } else {
        // Find if any category contains the param string
        const matched = CATEGORIES.find(c => c.toLowerCase().includes(catParam.toLowerCase()));
        if (matched) {
          setSelectedCategory(matched);
        }
      }
    }
  }, [searchParams]);

  // Handle Add To Cart visual feedback
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItemIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  // Handle Single WhatsApp Buy Now
  const handleBuyNow = (product) => {
    const phoneNumber = "+919876543210";
    const message = `Hi Yaal's Elegance, I am interested in purchasing the *${product.name}* (${product.category}) for ₹${product.price.toLocaleString("en-IN")}.\n\nPlease check availability. Thank you!`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "price-low") return a.price - b.price;
      if (sortOption === "price-high") return b.price - a.price;
      return 0; // Featured / Default sorting (as added/defined)
    });

  return (
    <div className="products-page page-content">
    

      {/* Filters & Grid Section */}
      <section className="catalog-section container-fluid">
        {/* Controls Panel */}
        <div className="controls-panel mb-5">
          <div className="row g-4 align-items-center">
            {/* Search Bar */}
            <div className="col-lg-4 col-md-6">
              <div className="search-bar-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search masterpieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  aria-label="Search masterpieces"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="col-lg-8 col-md-6 d-flex justify-content-md-end align-items-center gap-3">
              <span className="sort-label d-none d-lg-inline">Sort By</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
                aria-label="Sort products"
              >
                <option value="featured">Featured Masterpieces</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="category-filters-row mt-4">
            <div className="d-flex align-items-center gap-2 mb-2 d-lg-none text-muted small">
              <Funnel size={12} />
              <span>Filter Category</span>
            </div>
            <div className="category-pills">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`category-pill-btn ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-products-view text-center py-5">
            <h3>No masterpieces found</h3>
            <p className="text-muted">
              Adjust your filters or search terms to explore other luxury designs.
            </p>
            <button
              className="btn secondary-btn mt-3"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSortOption("featured");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
        <div className="row g-4">
  {filteredProducts.map((product) => (
    <div
      key={product.id}
      className="col-12 col-sm-6 col-md-6 col-lg-3"
    >
      <div className="product-luxury-card h-100">
        {/* Image Frame */}
        <div className="product-image-frame">
          <span className="product-badge">{product.category}</span>

          <img
            src={product.image}
            alt={product.name}
            className="product-card-img"
            loading="lazy"
          />

          <div className="product-card-overlay">
            <button
              onClick={() => handleBuyNow(product)}
              className="btn overlay-whatsapp-btn d-flex align-items-center gap-2"
            >
              <Whatsapp size={16} />
              Buy Now
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-block d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h4 className="product-card-title">{product.name}</h4>

            <div className="product-card-rating d-flex align-items-center gap-1">
              <StarFill className="star-icon" size={13} />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="product-card-desc">
            {product.description}
          </p>

          <div className="mt-auto pt-3 border-top-glow d-flex align-items-center justify-content-between">
            <span className="product-card-price">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <div className="product-card-buttons d-flex gap-2">
              <button
                onClick={() => handleAddToCart(product)}
                className={`btn add-to-cart-card-btn d-flex align-items-center justify-content-center gap-2 ${
                  addedItemIds[product.id] ? "added-success" : ""
                }`}
              >
                <BagPlus size={16} />
                {addedItemIds[product.id]
                  ? "Added ✓"
                  : "Add to Bag"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
        )}
      </section>
    </div>
  );
}

export default Products;
