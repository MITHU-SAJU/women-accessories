import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Trash, BoxArrowRight, CurrencyRupee, JournalPlus, Collection } from "react-bootstrap-icons";
import { useApp } from "../context/AppContext";
import "./Admin.css";

const CATEGORIES = [
  "Bridal Signature",
  "Heritage Gold",
  "Royal Pearl",
  "Classic Antique",
  "Bespoke Luxe"
];

function AdminDashboard() {
  const { adminAuth, products, addProduct, deleteProduct, logoutAdmin } = useApp();
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Authenticate check
  useEffect(() => {
    if (!adminAuth) {
      navigate("/admin/login");
    }
  }, [adminAuth, navigate]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    setSuccessMessage("");

    // Basic Validation
    if (!name.trim() || !price || !category || !image.trim() || !description.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    if (Number(price) <= 0) {
      alert("Please enter a valid price greater than zero.");
      return;
    }

    const newProduct = {
      name,
      price: Number(price),
      category,
      image,
      description
    };

    addProduct(newProduct);
    setSuccessMessage("Piece added to the Maison catalog successfully!");

    // Clear form
    setName("");
    setPrice("");
    setCategory(CATEGORIES[0]);
    setImage("");
    setDescription("");

    // Clear success message after delay
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDelete = (id, productName) => {
    if (window.confirm(`Are you sure you want to retire "${productName}" from the catalog?`)) {
      deleteProduct(id);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  if (!adminAuth) return null; // Avoid flicker before redirect

  return (
    <div className="admin-dashboard-page page-content">
      <div className="container py-4">
        {/* Header Panel */}
        <div className="dashboard-header d-flex flex-wrap align-items-center justify-content-between mb-5 p-4 shadow-sm">
          <div>
            <span className="dashboard-pill">MAISON JHUMKA PORTAL</span>
            <h1 className="dashboard-title mt-2">Maison Catalog Administration</h1>
          </div>
          <button onClick={handleLogout} className="btn logout-btn d-flex align-items-center gap-2">
            <BoxArrowRight size={18} />
            Sign Out Portal
          </button>
        </div>

        {successMessage && (
          <div className="alert alert-success-custom text-center mb-4">
            {successMessage}
          </div>
        )}

        <div className="row g-5">
          {/* Add Product Form Column */}
          <div className="col-lg-5">
            <div className="admin-panel-card h-100">
              <div className="panel-card-header d-flex align-items-center gap-2 mb-4">
                <JournalPlus className="panel-icon" />
                <h3>Add New Masterpiece</h3>
              </div>
              
              <form onSubmit={handleAddProduct}>
                {/* Product Name */}
                <div className="mb-3 input-group-luxury">
                  <label htmlFor="prod-name">Product Name</label>
                  <input
                    id="prod-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Pearl Petal Ear Studs"
                    required
                  />
                </div>

                {/* Category Dropdown */}
                <div className="mb-3 input-group-luxury">
                  <label htmlFor="prod-cat">Category Collection</label>
                  <select
                    id="prod-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Input */}
                <div className="mb-3 input-group-luxury">
                  <label htmlFor="prod-price">Price (INR)</label>
                  <div className="price-input-wrapper position-relative">
                    <CurrencyRupee className="price-symbol" />
                    <input
                      id="prod-price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g., 95000"
                      min="1"
                      required
                    />
                  </div>
                </div>

                {/* Image URL Input */}
                <div className="mb-3 input-group-luxury">
                  <label htmlFor="prod-img">Image URL</label>
                  <input
                    id="prod-img"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                  />
                  <small className="form-tip text-muted mt-1 d-block">
                    Use high quality Unsplash photos for a luxury aesthetic.
                  </small>
                </div>

                {/* Description Textarea */}
                <div className="mb-4 input-group-luxury">
                  <label htmlFor="prod-desc">Exquisite Description</label>
                  <textarea
                    id="prod-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the craftsmanship, metals, and gems..."
                    rows="4"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn admin-submit-btn w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <PlusCircle size={18} />
                  Add to Store Catalog
                </button>
              </form>
            </div>
          </div>

          {/* Manage Catalog List Column */}
          <div className="col-lg-7">
            <div className="admin-panel-card h-100">
              <div className="panel-card-header d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-2">
                  <Collection className="panel-icon" />
                  <h3>Active Catalog Items ({products.length})</h3>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <p>Maison catalog is empty. Add items to populate the storefront.</p>
                </div>
              ) : (
                <div className="table-responsive luxury-table-container">
                  <table className="table luxury-table align-middle">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "80px" }}>Piece</th>
                        <th scope="col">Details</th>
                        <th scope="col" className="text-end">Value</th>
                        <th scope="col" className="text-center" style={{ width: "60px" }}>Retire</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <div className="table-img-wrapper">
                              <img src={product.image} alt={product.name} />
                            </div>
                          </td>
                          <td>
                            <h6 className="table-product-title">{product.name}</h6>
                            <span className="table-product-category">{product.category}</span>
                          </td>
                          <td className="text-end fw-bold text-gold">
                            ₹{product.price.toLocaleString("en-IN")}
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => handleDelete(product.id, product.name)}
                              className="btn delete-btn-table"
                              title="Retire from store"
                            >
                              <Trash size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
