import React from "react";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f6f8fb" }}
    >
      <div className="bg-white p-5 rounded-4 shadow-lg text-center">
        <h1 className="text-success mb-3">Thank You!</h1>
        <p className="lead mb-4">
          Your order has been placed successfully.
        </p>
        <p className="text-muted">
          Order details have been sent to your email.
        </p>
        <button
          className="btn btn-dark mt-4"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
