import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import alertContext from "../context/alert/alertContext";

export default function ResetPassword({email, otpf}) {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const { showAlert } = useContext(alertContext);

  const handleReset = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    return showAlert("Passwords do not match", "danger");
  }

   alert(email);
    alert(otpf);

  if (!email || !otpf) {
    return showAlert("Reset session expired. Please try again.", "danger");
  }

  const res = await fetch("http://localhost:5000/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
  email,
  otp: otpf,   
  newPassword: password
}),
  });

  const data = await res.json();

  if (res.ok) {
    showAlert("Password reset successful", "success");
 
    navigate("/login");
  } else {
    showAlert("Reset failed", "danger");
  }
};


  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h2 className="fw-bold mb-4 text-uppercase">
                  Reset Password
                </h2>

                <form onSubmit={handleReset}>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="New Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                    />
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Reset Password
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
