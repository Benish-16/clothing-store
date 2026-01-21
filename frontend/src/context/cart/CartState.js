import React, { useContext, useState, useEffect } from "react";
import CartContext from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) fetchCart();
    else setLoading(false);
  }, [token]);


  const safeJson = async (res) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error("Non-JSON response:", text);
      return null;
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch(
        "https://clothing-store-backc-p6nl.onrender.com/api/cart/fetchcart",
        {
          headers: { "auth-token": token },
        }
      );

      if (!res.ok) {
        console.error("Fetch cart failed:", res.status, res.statusText);
        setCartItems([]);
        return;
      }

      const data = await safeJson(res);
      setCartItems(data?.items || []);
    } catch (err) {
      console.error("Fetch cart error:", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item, qty) => {
    if (!token) return console.error("User not authenticated");

    try {
      const res = await fetch(
        "https://clothing-store-backc-p6nl.onrender.com/api/cart/addcart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ ...item, quantity: qty }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Add to cart failed:", text);
        return;
      }

      const data = await safeJson(res);
      if (data?.success) setCartItems(data.cart.items || []);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const removeFromCart = async (item) => {
    if (!token) return console.error("User not authenticated");

    try {
      const res = await fetch(
        "https://clothing-store-backc-p6nl.onrender.com/api/cart/removecart",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            productId: item.product._id,
            color: item.variant.color,
            size: item.size,
            quantity: item.quantity, 
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Remove from cart failed:", text);
        return;
      }

      const data = await safeJson(res);
      if (data?.success) setCartItems(data.cart.items || []);
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, loading, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
