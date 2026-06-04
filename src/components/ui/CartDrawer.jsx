import React from "react";
import { X, Dash, Plus, Trash, Whatsapp } from "react-bootstrap-icons";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./CartDrawer.css";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useApp();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const phoneNumber = "+919876543210"; // Default contact phone number
    let message = "Hi Yaal's Elegance, I would like to place an order for the following items:\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}* (Qty: ${item.quantity}) - ₹${(item.product.price * item.quantity).toLocaleString("en-IN")}\n`;
    });

    message += `\n*Total Order Value:* ₹${total.toLocaleString("en-IN")}\n\nPlease let me know how to proceed with the payment. Thank you!`;

    const whatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDiscover = () => {
    onClose();
    navigate("/products");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-drawer-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-drawer-header">
          <h5>Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h5>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-view">
              <div className="empty-icon-wrapper">
                <X size={40} className="text-muted" />
              </div>
              <h4>Your bag is empty</h4>
              <p>Discover our beautiful collections and find something extraordinary.</p>
              <button className="btn primary-btn discover-btn" onClick={handleDiscover}>
                Discover Collection
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <span className="cart-item-category">{item.product.category}</span>
                    <h6 className="cart-item-name">{item.product.name}</h6>
                    <span className="cart-item-price">
                      ₹{item.product.price.toLocaleString("en-IN")}
                    </span>

                    <div className="cart-item-actions mt-2">
                      <div className="quantity-controller">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.quantity - 1)
                          }
                          className="qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <Dash size={16} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.quantity + 1)
                          }
                          className="qty-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="delete-item-btn ms-auto"
                        aria-label="Remove item from cart"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row d-flex justify-content-between mb-3">
              <span className="label">Subtotal</span>
              <span className="value">₹{total.toLocaleString("en-IN")}</span>
            </div>
            
            <button
              onClick={handleWhatsAppCheckout}
              className="btn checkout-btn w-100 d-flex align-items-center justify-content-center gap-2 mb-2"
            >
              <Whatsapp size={18} />
              Checkout via WhatsApp
            </button>
            
            <button
              onClick={clearCart}
              className="btn btn-link clear-cart-btn w-100 text-center"
            >
              Clear Shopping Bag
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
