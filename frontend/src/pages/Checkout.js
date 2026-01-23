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
    location.state || JSON.parse(localStorage.getItem("checkoutData"));

  const [otpSent, setOtpSent] = useState(
    localStorage.getItem("otpSent") === "true"
  );

  const [otp, setOtp] = useState(
    JSON.parse(localStorage.getItem("otp")) || ["", "", "", "", "", ""]
  );

  if (!data) return <Navigate to="/cart" replace />;

  const { cartItems, subtotal, shippingCost, deliveryType, total } = data;



  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    localStorage.setItem("otp", JSON.stringify(newOtp));

    if (value && index < otp.length - 1) {
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
    } catch {
      showAlert("OTP error", "danger");
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("checkoutEmail");
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      showAlert("Enter complete OTP", "danger");
      return;
    }

    try {
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

      await fetch(
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

      clearCart();
      localStorage.clear();
      navigate("/confirmation");
    } catch {
      showAlert("Something went wrong", "danger");
    }
  };


  return (
    <div className="container-fluid py-5" style={{ minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="bg-white shadow rounded-4 p-4">
            <h3 className="fw-bold text-center mb-4">Checkout</h3>

            <form onSubmit={!otpSent ? sendOtp : handleCheckout}>
  
              <h6 className="fw-bold">Contact</h6>
              <input
                id="email"
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                defaultValue={localStorage.getItem("checkoutEmail") || ""}
                disabled={otpSent}
                required
              />

            
              <h6 className="fw-bold mt-4">Delivery</h6>

              <div className="row">
                <div className="col">
                  <input id="firstName" className="form-control mb-3" placeholder="First name" required />
                </div>
                <div className="col">
                  <input id="lastName" className="form-control mb-3" placeholder="Last name" required />
                </div>
              </div>

              <input id="address" className="form-control mb-3" placeholder="Address" required />
              <input id="apartment" className="form-control mb-3" placeholder="Apartment (optional)" />

              <div className="row">
                <div className="col-md-5">
                  <input id="city" className="form-control mb-3" placeholder="City" required />
                </div>
                <div className="col-md-4">
                  <input id="state" className="form-control mb-3" placeholder="State" required />
                </div>
                <div className="col-md-3">
                  <input id="pin" className="form-control mb-3" placeholder="PIN" required />
                </div>
              </div>

              <input id="phone" className="form-control mb-4" placeholder="Phone number" required />

              <h6 className="fw-bold">Payment</h6>
              <input className="form-control mb-3" placeholder="Card number" required />
              <div className="row">
                <div className="col">
                  <input className="form-control mb-3" placeholder="MM / YY" required />
                </div>
                <div className="col">
                  <input className="form-control mb-3" placeholder="CVV" required />
                </div>
              </div>


              {otpSent && (
                <div className="d-flex justify-content-between mb-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      maxLength="1"
                      className="form-control text-center mx-1"
                      style={{ width: "45px" }}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                    />
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={otpSent && otp.some((d) => d === "")}
                className={`btn w-100 ${otpSent ? "btn-success" : "btn-dark"}`}
              >
                {!otpSent ? "Pay Now" : "Confirm Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
