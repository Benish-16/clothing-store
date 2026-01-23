import { Link, useLocation, useNavigate } from "react-router-dom";
import authContext from "../context/auth/authContext";
import React, { useContext, useEffect, useState } from "react";
import "../App.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-white fixed-top py-3 shadow-sm" style={{ zIndex: 1050 }}>
      <div className="container-fluid px-4 px-lg-5 d-flex align-items-center justify-content-between">

  
        {!user?.admin && (
          <ul className="navbar-nav flex-row gap-4 d-none d-lg-flex">
            <li className="nav-item"><Link to="/women" className="nav-link">WOMEN</Link></li>
            <li className="nav-item"><Link to="/men" className="nav-link">MEN</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">ABOUT</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link">CONTACT</Link></li>
          </ul>
        )}

        {/* BRAND */}
        <div className="flex-grow-1 text-center">
          <Link
            to="/"
            className="navbar-brand fw-light"
            style={{ letterSpacing: "4px" }}
          >
            {user?.admin ? `${capitalize(user?.name)} Dashboard` : "MINIMAL"}
          </Link>
        </div>

        {/* RIGHT MENU (DESKTOP ONLY) */}
        <ul className="navbar-nav flex-row gap-3 d-none d-lg-flex align-items-center">
          {!localStorage.getItem("token") ? (
            <>
              <li>
                <Link to="/login" className="btn btn-outline-dark btn-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-dark btn-sm">
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button className="btn btn-outline-dark btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}

          {!user?.admin && (
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                <i className="bi bi-bag fs-5"></i>
              </Link>
            </li>
          )}
        </ul>

   
        {!user?.admin && (
          <button
            className="navbar-toggler border-0 d-lg-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

      
       <nav className="navbar navbar-expand-lg navbar-light bg-white px-3">
  <div className="container-fluid d-flex align-items-center">

    {/* 👜 Bag – LEFT */}
    <Link to="/cart" className="nav-link order-1">
      <i className="bi bi-bag fs-4"></i>
    </Link>

    {/* ☰ Hamburger – RIGHT */}
    <button
      className="navbar-toggler order-3"
      type="button"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Collapsible menu */}
    <div
      className={`collapse navbar-collapse order-2 ${menuOpen ? "show" : ""}`}
    >
      <ul className="navbar-nav text-center py-4 gap-3 ms-auto">
        <li><Link to="/women" className="nav-link" onClick={() => setMenuOpen(false)}>WOMEN</Link></li>
        <li><Link to="/men" className="nav-link" onClick={() => setMenuOpen(false)}>MEN</Link></li>
        <li><Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>ABOUT</Link></li>
        <li><Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link></li>

        {!localStorage.getItem("token") ? (
          <>
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-dark w-75 mx-auto" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="btn btn-dark w-75 mx-auto" onClick={() => setMenuOpen(false)}>
                Signup
              </Link>
            </li>
          </>
        ) : (
          <li className="nav-item">
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
