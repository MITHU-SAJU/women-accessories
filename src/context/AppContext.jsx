import React, { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Aura Luxe Jhumka",
    price: 89999,
    category: "Bespoke Luxe",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
    description: "A glorious blend of 22k gold and fine-cut diamonds. Exquisitely handcrafted for the modern royal.",
    rating: 4.9
  },
  {
    id: 2,
    name: "Bridal Signature Drops",
    price: 145000,
    category: "Bridal Signature",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    description: "Intricate traditional design adorned with rubies and south sea pearls. Crafted to complete your dream wedding look.",
    rating: 5.0
  },
  {
    id: 3,
    name: "Heritage Gold Chandelier",
    price: 120000,
    category: "Heritage Gold",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800",
    description: "An heirloom masterpiece reflecting 100 years of Maison Jhumka. Classic antique gold polish with elaborate filigree.",
    rating: 4.8
  },
  {
    id: 4,
    name: "Royal Pearl Cluster",
    price: 65000,
    category: "Royal Pearl",
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a1a89c8a?auto=format&fit=crop&q=80&w=800",
    description: "Delicate and luminous fresh water pearl clusters suspended from a gold floral motif. Minimal elegance.",
    rating: 4.7
  },
  {
    id: 5,
    name: "Classic Antique Jhumka",
    price: 78000,
    category: "Classic Antique",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    description: "A rustic antique finish featuring traditional temple designs and miniature gold beads that chime softly.",
    rating: 4.8
  },
  {
    id: 6,
    name: "Pearl & Emerald Chandbalis",
    price: 95000,
    category: "Bespoke Luxe",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop",
    description: "Stunning crescent shape Chandbalis studded with premium emeralds and delicate pearls. Hand-selected.",
    rating: 4.9
  }
];

export const AppProvider = ({ children }) => {
  // Load products from localStorage or use defaults
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("jhumka_products");
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("jhumka_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Check admin auth state from sessionStorage
  const [adminAuth, setAdminAuth] = useState(() => {
    return sessionStorage.getItem("jhumka_admin_auth") === "true";
  });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jhumka_products", JSON.stringify(products));
  }, [products]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("jhumka_cart", JSON.stringify(cart));
  }, [cart]);

  // Admin authentication handlers
  const loginAdmin = (username, password) => {
    if (username.toLowerCase() === "admin" && password === "admin") {
      setAdminAuth(true);
      sessionStorage.setItem("jhumka_admin_auth", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminAuth(false);
    sessionStorage.removeItem("jhumka_admin_auth");
  };

  // Product management handlers
  const addProduct = (newProduct) => {
    setProducts((prev) => [
      ...prev,
      {
        ...newProduct,
        id: Date.now(), // Generate unique ID
        price: Number(newProduct.price),
        rating: 5.0
      }
    ]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // Also remove from cart if it is there
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  // Shopping cart handlers
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        adminAuth,
        loginAdmin,
        logoutAdmin,
        addProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
