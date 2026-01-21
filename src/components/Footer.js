import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter an email");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/subscribe/sent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.success) {
      
        setEmail("");
      } else {
        alert(data.msg || "Already subscribed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <footer className="bg-light py-5 ">
      <div className="container">
        <div className="row g-4">

          <div className="col-lg-4">
            <h6 style={{ letterSpacing: "3px", fontWeight: 300 }}>MINIMAL</h6>
            <p className="text-muted small mt-3">
              Quality essentials for everyday living.
              Thoughtfully designed, sustainably made.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="small fw-semibold mb-3">SHOP</h6>
            <ul className="list-unstyled small">
              <li><Link to="/women" className="text-muted text-decoration-none">Women</Link></li>
              <li><Link to="/men" className="text-muted text-decoration-none">Men</Link></li>
              
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="small fw-semibold mb-3">COMPANY</h6>
            <ul className="list-unstyled small">
              <li><Link to="/about" className="text-muted text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-muted text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h6 className="small fw-semibold mb-3">Subscription</h6>
            <div className="input-group">
              <input
                type="email"
                className="form-control form-control-sm border-dark"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="btn btn-dark btn-sm px-4"
                onClick={handleSubscribe}
              >
                JOIN
              </button>
            </div>
          </div>
        </div>

        <hr className="my-4" />
        <p className="text-muted small text-center mb-0">
          © 2026 MINIMAL. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
