import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldLock, Key, Person } from "react-bootstrap-icons";
import { useApp } from "../context/AppContext";
import "./Admin.css";

function AdminLogin() {
  const { loginAdmin, adminAuth } = useApp();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (adminAuth) {
      navigate("/admin");
    }
  }, [adminAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Artificial tiny delay for premium feel
    setTimeout(() => {
      const success = loginAdmin(username, password);
      setLoading(false);
      if (success) {
        navigate("/admin");
      } else {
        setError("Invalid administrative credentials. Please try again.");
      }
    }, 800);
  };

  return (
    <div className="admin-login-page page-content d-flex align-items-center justify-content-center">
      <div className="admin-login-card shadow-lg">
        {/* Top Accent */}
        <div className="card-top-accent"></div>

        {/* Header */}
        <div className="text-center mb-4">
          <span className="security-badge">
            <ShieldLock size={14} />
            SECURE ACCESS
          </span>
          <h2 className="admin-brand mt-2">JHUMKA</h2>
          <p className="admin-subtitle">Maison Portal Entry</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger-custom text-center mb-3">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3 input-group-luxury">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <Person className="input-icon" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin ID"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4 input-group-luxury">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Key className="input-icon" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn admin-submit-btn w-100 d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Authenticate Entry"
            )}
          </button>
        </form>

        {/* Info Helper (For Demo Purposes) */}
        <div className="text-center mt-4 credentials-helper">
          <small>Use credentials: <strong>admin</strong> / <strong>admin</strong></small>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
