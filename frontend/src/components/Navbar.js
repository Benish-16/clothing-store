import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authContext from "../context/auth/authContext";
import "../App.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-white fixed-top py-3 shadow-sm"
      style={{ zIndex: 1050 }}
    >
      <div className="container-fluid px-4 px-lg-5 d-flex align-items-center justify-content-between">

        {/* 👜 BAG — LEFT (mobile only) */}
        <Link to="/cart" className="nav-link d-lg-none order-1">
          <i className="bi bi-bag fs-4"></i>
        </Link>

        {/* BRAND — CENTER */}
        <Link
          to="/"
          className="navbar-brand mx-auto fw-light text-center order-2"
          style={{ letterSpacing: "4px" }}
        >
          {user?.admin ? `${user?.name} Dashboard` : "MINIMAL"}
        </Link>

        {/* ☰ HAMBURGER — RIGHT (mobile only) */}
        <button
          className="navbar-toggler border-0 d-lg-none order-3"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* DESKTOP CENTER MENU */}
        <ul className="navbar-nav gap-4 d-none d-lg-flex mx-auto">
          <li><Link to="/women" className="nav-link">WOMEN</Link></li>
          <li><Link to="/men" className="nav-link">MEN</Link></li>
          <li><Link to="/about" className="nav-link">ABOUT</Link></li>
          <li><Link to="/contact" className="nav-link">CONTACT</Link></li>
        </ul>

        {/* DESKTOP RIGHT */}
        <ul className="navbar-nav gap-3 d-none d-lg-flex align-items-center ms-auto">
          {!localStorage.getItem("token") ? (
            <>
              <li><Link to="/login" className="nav-link">Login</Link></li>
              <li><Link to="/signup" className="btn btn-dark btn-sm">Signup</Link></li>
            </>
          ) : (
            <li>
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}

          <li>
            <Link to="/cart" className="nav-link">
              <i className="bi bi-bag fs-5"></i>
            </Link>
          </li>
        </ul>

        {/* MOBILE COLLAPSE MENU */}
        <div
          className={`collapse navbar-collapse d-lg-none w-100 order-4 ${menuOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav text-center py-4 gap-3">
            <li><Link to="/women" className="nav-link" onClick={() => setMenuOpen(false)}>WOMEN</Link></li>
            <li><Link to="/men" className="nav-link" onClick={() => setMenuOpen(false)}>MEN</Link></li>
            <li><Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>ABOUT</Link></li>
            <li><Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link></li>

            {!localStorage.getItem("token") ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="btn btn-outline-dark w-75 mx-auto"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="btn btn-dark w-75 mx-auto"
                    onClick={() => setMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="btn btn-outline-dark w-75 mx-auto"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

      </div>
    </nav>
  );
}
