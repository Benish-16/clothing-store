import React, { useState, useContext } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";
import { useCart } from "../context/cart/CartState";

export default function Checkout() {
  const { clearCart } = useCart();
  const { showAlert } = useContext(alertContext);
  const navigate = useNavigate();
  const location = useLocation();


  const data =
    location.state ||
    JSON.parse(localStorage.getItem("checkoutData"));

  if (!data) {
    return <Navigate to="/cart" replace />;
  }

  const { cartItems, subtotal, shippingCost, deliveryType, total } = data;


  const [otpSent, setOtpSent] = useState(
    localStorage.getItem("otpSent") === "true"
  );

  const [otp, setOtp] = useState(
    JSON.parse(localStorage.getItem("otp")) || ["", "", "", "", "", ""]
  );



  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    localStorage.setItem("otp", JSON.stringify(newOtp));

  
      document.getElementById(`otp-${index + 1}`)?.focus();
    }


    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };



  const sendOtp = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    if (!email) {
      showAlert("Email is required", "danger");
      return;
    }

    try {
      const res = await fetch(
        "https://clothing-store-backc-p6nl.onrender.com/api/order/sendotp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        showAlert("OTP sent to email", "success");
        setOtpSent(true);
        localStorage.setItem("otpSent", "true");
        localStorage.setItem("checkoutEmail", email);
      } else {
        showAlert(result.error || "OTP failed", "danger");
      }
    } catch (err) {
      showAlert("OTP error", "danger");
    }
  };

  

  const handleCheckout = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("checkoutEmail");
    const finalOtp = otp.join("");

    try {
      // Verify OTP
      const verifyRes = await fetch(
        "https://clothing-store-backc-p6nl.onrender.com/api/order/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: finalOtp }),
        }
      );

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        showAlert(verifyData.error || "Wrong OTP", "danger");
        return;
      }

      showAlert("OTP verified", "success");

      // Customer info
      const customer = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        apartment: document.getElementById("apartment").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        pin: document.getElementById("pin").value,
        country: "India",
      };

      const payload = {
        customer,
        cartItems,
        subtotal,
        shippingCost,
        deliveryType,
        total,
        paymentMethod: "Card",
      };

      const orderRes = await fetch(
        "https://clothing-store-backc-p6nl.onrender.com/api/order/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(payload),
        }
      );

      const orderData = await orderRes.json();

      if (orderData.success) {
        clearCart();


        localStorage.removeItem("otpSent");
        localStorage.removeItem("otp");
        localStorage.removeItem("checkoutEmail");
        localStorage.removeItem("checkoutData");

        showAlert("Order placed successfully!", "success");
        navigate("/confirmation");
      } else {
        showAlert(orderData.error || "Order failed", "danger");
      }
    } catch (err) {
      showAlert("Something went wrong", "danger");
    }
  };



  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">Checkout</h3>

      <form onSubmit={!otpSent ? sendOtp : handleCheckout}>
        <input
          id="email"
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          defaultValue={localStorage.getItem("checkoutEmail") || ""}
          required
        />

        {otpSent && (
          <div className="d-flex justify-content-between mb-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                className="form-control text-center mx-1"
                style={{ width: "45px", fontSize: "18px" }}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={otpSent && otp.some((d) => d === "")}
          className={`btn w-100 ${
            otpSent ? "btn-success" : "btn-dark"
          }`}
        >
          {!otpSent ? "Pay Now" : "Confirm Order"}
        </button>
      </form>
    </div>
  );
}
