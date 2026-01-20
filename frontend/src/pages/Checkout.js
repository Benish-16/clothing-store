import React, { useState, useContext } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";
import { useCart } from "../context/cart/CartState";


export default function Checkout() {
  
const { clearCart } = useCart();
  const { showAlert } = useContext(alertContext);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  if (!data) {
    return <Navigate to="/cart" />;
  }

  const { cartItems, subtotal, shippingCost, deliveryType, total } = data;

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    if (!email) {
      showAlert("Email is required", "danger");
      return;
    }

    try {
      const res = await fetch("https://clothing-store-backc.onrender.com/api/order/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        showAlert("OTP sent to email", "success");
        setOtpSent(true);
      } else {
        showAlert(data.error || "OTP failed", "danger");
      }
    } catch (err) {
      console.error(err);
      showAlert("OTP error", "danger");
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const finalOtp = otp.join("");

    try {
     
      const verifyRes = await fetch("https://clothing-store-backc.onrender.com/api/order/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: finalOtp }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        showAlert(verifyData.error || "Wrong OTP", "danger");
        return;
      }

      showAlert("OTP verified", "success");

    
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

     
      const orderRes = await fetch("https://clothing-store-backc.onrender.com/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      });

      const orderData = await orderRes.json();

      if (orderData.success) {
           clearCart();
        showAlert("Order placed successfully!", "success");
        navigate('/confirmation');
     
           await fetch("https://clothing-store-backc.onrender.com/api/order/sendemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({   cartItems,total,email,shippingCost,subtotal }),
      });

        navigate("/confirmation");
      } else {
        showAlert(orderData.error || "Failed to place order", "danger");
      }
    } catch (err) {
      console.error(err);
      showAlert("Something went wrong", "danger");
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ background: "linear-gradient(135deg, #f6f8fb, #eef1f6)", minHeight: "100vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-6 col-xl-6">
          <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
            <h3 className="fw-bold mb-1 text-center">Checkout</h3>

            <form onSubmit={!otpSent ? sendOtp : handleCheckout}>
          
              <section className="mb-4">
                <h6 className="fw-bold mb-3">Contact</h6>
                <input
                  id="email"
                  className="form-control form-control-lg mb-3"
                  placeholder="Email address"
                  type="email"
                  required
                />
              </section>

          
              <section className="mb-4">
                <h6 className="fw-bold mb-3">Delivery</h6>
                <p className="text-muted small mb-3">Delivery available within India only</p>

                <select className="form-select form-select-lg mb-3" required>
                  <option value="">Select Country</option>
                  <option>India</option>
                </select>

                <div className="row">
                  <div className="col">
                    <input id="firstName" className="form-control form-control-lg mb-3" placeholder="First name" required />
                  </div>
                  <div className="col">
                    <input id="lastName" className="form-control form-control-lg mb-3" placeholder="Last name" required />
                  </div>
                </div>

                <input id="address" className="form-control form-control-lg mb-3" placeholder="Address" required />
                <input id="apartment" className="form-control form-control-lg mb-3" placeholder="Apartment, suite, etc. (optional)" />
                
                <div className="row">
                  <div className="col-md-5">
                    <input id="city" className="form-control form-control-lg mb-3" placeholder="City" required />
                  </div>
                  <div className="col-md-4">
                    <input id="state" className="form-control form-control-lg mb-3" placeholder="State" required />
                  </div>
                  <div className="col-md-3">
                    <input id="pin" className="form-control form-control-lg mb-3" placeholder="PIN" required />
                  </div>
                </div>

                <input id="phone" className="form-control form-control-lg" placeholder="Phone number" required />
              </section>

              <section className="mb-4">
                <h6 className="fw-bold mb-3">Payment</h6>
                <div className="border rounded-3 p-3 bg-light">
                  <input className="form-control form-control-lg mb-3" placeholder="Card number"        pattern="[0-9]{16}"
    maxLength="16"     title="Card number must be 16 digits"    onChange={(e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  }}required />
                  <div className="row">
                    <div className="col">
                      <input className="form-control form-control-lg mb-3"onChange={(e) => {
e.target.value = e.target.value.replace(/[^0-9/]/g, "");}}  pattern="(0[1-9]|1[0-2])\/[0-9]{2}" placeholder="MM / YY"   title="Enter valid expiry date (MM/YY)" required />
                    </div>
                    <div className="col">
                      <input className="form-control form-control-lg mb-3"      placeholder="CVV"        title="CVV must be 3 digits"   onChange={(e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  }}required />
                    </div>
                  </div>
                  <input className="form-control form-control-lg" placeholder="Name on card" required />
                </div>
              </section>

         
              {otpSent && (
                <div className="d-flex justify-content-between mb-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="form-control text-center mx-1"
                      style={{ width: "45px" }}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      required
                    />
                  ))}
                </div>
              )}

              <button
                type="submit"
                className={`btn w-100 py-3 fw-bold rounded-3 ${!otpSent ? "btn-dark" : "btn-success"}`}
              >
                {!otpSent ? "Pay Now" : "Confirm Order"}
              </button>

              <p className="text-center text-muted mt-3 small">
                Your payment is secure and encrypted
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
