import React, { useContext, useState, useEffect } from "react";
import CartContext from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) fetchCart();
    else {
      setCartItems([]);
      setLoading(false);
    }
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


  const fetchWithRetry = async (
    url,
    options = {},
    retries = 3,
    delay = 1000,
    message = "Processing..."
  ) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        setProcessing(true);
        setAlertMsg(`${message} (Attempt ${attempt}/${retries})`);

        const res = await fetch(url, options);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res; 
      } catch (err) {
        console.error(`Attempt ${attempt} failed`, err);

        if (attempt === retries) {
          throw err; // ❌ FINAL FAIL
        }

        await new Promise((r) => setTimeout(r, delay));
      }
    }
  };


  const fetchCart = async () => {
    try {
      const res = await fetchWithRetry(
        "https://clothing-store-backc-p6nl.onrender.com/api/cart/fetchcart",
        {
          headers: { "auth-token": token },
        },
        3,
        1000,
        "Loading your cart..."
      );

      const data = await safeJson(res);
      setCartItems(data?.items || []);
    } catch (err) {
      console.error("Fetch cart failed after retries");
      setCartItems([]);
    } finally {
      setProcessing(false);
      setAlertMsg("");
      setLoading(false);
    }
  };


  const addToCart = async (item, qty) => {
    if (!token) return console.error("User not authenticated");

    try {
      const res = await fetchWithRetry(
        "https://clothing-store-backc-p6nl.onrender.com/api/cart/addcart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ ...item, quantity: qty }),
        },
        3,
        1000,
        "Adding item to cart..."
      );

      const data = await safeJson(res);
      if (data?.success) {
        setCartItems(data.cart.items || []);
      }
    } catch (err) {
      console.error("Add to cart failed after retries");
    } finally {
      setProcessing(false);
      setAlertMsg("");
    }
  };


  const removeFromCart = async (item) => {
    if (!token) return console.error("User not authenticated");

    try {
      const res = await fetchWithRetry(
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
        },
        3,
        1000,
        "Removing item from cart..."
      );

      const data = await safeJson(res);
      if (data?.success) {
        setCartItems(data.cart.items || []);
      }
    } catch (err) {
      console.error("Remove from cart failed after retries");
    } finally {
      setProcessing(false);
      setAlertMsg("");
    }
  };


  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        processing,
        alertMsg,
        addToCart,
        removeFromCart,
        clearCart,
        setCartItems,
      }}
    >
      {processing && (
        <div className="alert alert-warning text-center m-0">
          {alertMsg}
        </div>
      )}
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
