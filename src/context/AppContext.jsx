import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase, isSupabaseConfigured } from "../config/supabaseClient";

const AppContext = createContext();

const DEFAULT_PRODUCTS = [
  {
    name: "Aura Luxe Jhumka",
    price: 89999,
    category: "Bespoke Luxe",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
    description: "A glorious blend of 22k gold and fine-cut diamonds. Exquisitely handcrafted for the modern royal.",
    rating: 4.9
  },
  {
    name: "Bridal Signature Drops",
    price: 145000,
    category: "Bridal Signature",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    description: "Intricate traditional design adorned with rubies and south sea pearls. Crafted to complete your dream wedding look.",
    rating: 5.0
  },
  {
    name: "Heritage Gold Chandelier",
    price: 120000,
    category: "Heritage Gold",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800",
    description: "An heirloom masterpiece reflecting 100 years of Maison Jhumka. Classic antique gold polish with elaborate filigree.",
    rating: 4.8
  },
  {
    name: "Royal Pearl Cluster",
    price: 65000,
    category: "Royal Pearl",
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a1a89c8a?auto=format&fit=crop&q=80&w=800",
    description: "Delicate and luminous fresh water pearl clusters suspended from a gold floral motif. Minimal elegance.",
    rating: 4.7
  },
  {
    name: "Classic Antique Jhumka",
    price: 78000,
    category: "Classic Antique",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    description: "A rustic antique finish featuring traditional temple designs and miniature gold beads that chime softly.",
    rating: 4.8
  },
  {
    name: "Pearl & Emerald Chandbalis",
    price: 95000,
    category: "Bespoke Luxe",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop",
    description: "Stunning crescent shape Chandbalis studded with premium emeralds and delicate pearls. Hand-selected.",
    rating: 4.9
  }
];

export const AppProvider = ({ children }) => {
  // Load products: Fallback uses localStorage immediately
  const [products, setProducts] = useState(() => {
    if (!isSupabaseConfigured) {
      const saved = localStorage.getItem("jhumka_products");
      // Add local ID if defaults are loaded
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS.map((p, idx) => ({ ...p, id: idx + 1 }));
    }
    return DEFAULT_PRODUCTS; // temporary, will be overwritten by fetch in useEffect
  });

  const [loadingProducts, setLoadingProducts] = useState(isSupabaseConfigured);

  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("jhumka_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Check admin auth state from sessionStorage or Supabase session
  const [adminAuth, setAdminAuth] = useState(() => {
    return sessionStorage.getItem("jhumka_admin_auth") === "true";
  });

  // Sync products from Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Database is connected but empty. Let's auto-seed!
          console.log("Supabase products table is empty. Seeding defaults...");
          const { error: seedError } = await supabase
            .from("products")
            .insert(DEFAULT_PRODUCTS);

          if (seedError) {
            console.error("Seeding failed:", seedError);
          } else {
            const { data: seededData } = await supabase
              .from("products")
              .select("*")
              .order("id", { ascending: true });
            if (seededData) setProducts(seededData);
          }
        }
      } catch (err) {
        console.error("Failed to load products from Supabase database:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();

    // Check if Supabase already has a user session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setAdminAuth(true);
        sessionStorage.setItem("jhumka_admin_auth", "true");
      }
    };
    checkSession();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("jhumka_cart", JSON.stringify(cart));
  }, [cart]);

  // Admin authentication handlers
  const loginAdmin = async (email, password) => {
    if (isSupabaseConfigured) {
      try {
        // Authenticate with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.includes("@") ? email : `${email}@jhumka.com`, // support using short email or simple username
          password,
        });

        if (error) throw error;

        if (data?.user) {
          setAdminAuth(true);
          sessionStorage.setItem("jhumka_admin_auth", "true");
          return { success: true };
        }
      } catch (err) {
        console.error("Supabase login error:", err);
        return { success: false, error: err.message };
      }
    } else {
      // Fallback Demo login
      if (email.toLowerCase() === "admin" && password === "admin") {
        setAdminAuth(true);
        sessionStorage.setItem("jhumka_admin_auth", "true");
        return { success: true };
      }
      return { success: false, error: "Invalid administrative credentials. (Use admin / admin in Demo mode)" };
    }
  };

  const logoutAdmin = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setAdminAuth(false);
    sessionStorage.removeItem("jhumka_admin_auth");
  };

  // Product management handlers
  const addProduct = async (newProduct) => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("products")
          .insert([
            {
              name: newProduct.name,
              price: Number(newProduct.price),
              category: newProduct.category,
              image: newProduct.image,
              description: newProduct.description,
              rating: 5.0
            }
          ])
          .select();

        if (error) throw error;

        if (data && data.length > 0) {
          setProducts((prev) => [...prev, data[0]]);
          return { success: true };
        }
      } catch (err) {
        console.error("Failed to add product to Supabase:", err);
        return { success: false, error: err.message };
      }
    } else {
      // Local Storage Fallback
      const newProdObj = {
        ...newProduct,
        id: Date.now(),
        price: Number(newProduct.price),
        rating: 5.0
      };
      setProducts((prev) => {
        const updated = [...prev, newProdObj];
        localStorage.setItem("jhumka_products", JSON.stringify(updated));
        return updated;
      });
      return { success: true };
    }
  };

  const deleteProduct = async (id) => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("id", id);

        if (error) throw error;

        setProducts((prev) => prev.filter((p) => p.id !== id));
        setCart((prev) => prev.filter((item) => item.product.id !== id));
        return { success: true };
      } catch (err) {
        console.error("Failed to delete product from Supabase:", err);
        return { success: false, error: err.message };
      }
    } else {
      // Local Storage Fallback
      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        localStorage.setItem("jhumka_products", JSON.stringify(updated));
        return updated;
      });
      setCart((prev) => prev.filter((item) => item.product.id !== id));
      return { success: true };
    }
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
        loadingProducts,
        cart,
        adminAuth,
        isSupabaseConfigured,
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
