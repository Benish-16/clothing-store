import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authContext from "../context/auth/authContext";
import "../App.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top py-3 shadow-sm">
      <div className="container-fluid px-4 px-lg-5">

    
        <Link to="/cart" className="nav-link d-lg-none">
          <i className="bi bi-bag fs-4"></i>
        </Link>

  
        <Link
          to="/"
          className="navbar-brand mx-auto mx-lg-0 fw-light"
          style={{ letterSpacing: "4px" }}
        >
        MINIMAL
        </Link>


        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>

          <ul className="navbar-nav mx-auto gap-4 text-center">
            <li className="nav-item">
              <Link to="/women" className="nav-link" onClick={() => setMenuOpen(false)}>
                WOMEN
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/men" className="nav-link" onClick={() => setMenuOpen(false)}>
                MEN
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
                CONTACT
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav gap-3 align-items-center ms-lg-auto text-center">
            {!localStorage.getItem("token") ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="btn btn-dark btn-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            )}

   
            <li className="nav-item d-none d-lg-block">
              <Link to="/cart" className="nav-link">
                <i className="bi bi-bag fs-5"></i>
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}
