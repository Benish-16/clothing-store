import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authContext from "../context/auth/authContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top py-3 shadow-sm" style={{ zIndex: 1050 }}>
      <div className="container-fluid px-4 px-lg-5 align-items-center">

        <Link to="/cart" className="nav-link d-lg-none position-absolute start-0 ms-3">
          <i className="bi bi-bag fs-4"></i>
        </Link>

    
        <Link
          to="/"
          className="navbar-brand mx-auto fw-light text-center"
          style={{ letterSpacing: "4px" }}
        >
          MINIMAL
        </Link>

        <button
          className="navbar-toggler border-0 d-lg-none position-absolute end-0 me-3"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

  
        <div className="d-none d-lg-flex w-100 align-items-center">

   
          <ul className="navbar-nav gap-4">
            <li><Link to="/women" className="nav-link">WOMEN</Link></li>
            <li><Link to="/men" className="nav-link">MEN</Link></li>
            <li><Link to="/about" className="nav-link">ABOUT</Link></li>
            <li><Link to="/contact" className="nav-link">CONTACT</Link></li>
          </ul>

 
          <ul className="navbar-nav gap-3 ms-auto align-items-center">
            {!localStorage.getItem("token") ? (
              <>
                <li><Link to="/login" className="nav-link">Login</Link></li>
                <li><Link to="/signup" className="btn btn-dark btn-sm">Signup</Link></li>
              </>
            ) : (
              <li>
                <button className="btn btn-outline-dark btn-sm" onClick={handleLogout}>
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
        </div>


        {menuOpen && (
          <div className="d-lg-none w-100 mt-4">
            <ul className="navbar-nav text-center gap-3">
              <li><Link to="/women" className="nav-link" onClick={() => setMenuOpen(false)}>WOMEN</Link></li>
              <li><Link to="/men" className="nav-link" onClick={() => setMenuOpen(false)}>MEN</Link></li>
              <li><Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>ABOUT</Link></li>
              <li><Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link></li>

              {!localStorage.getItem("token") ? (
                <>
                  <li><Link to="/login" className="btn btn-outline-dark w-75 mx-auto">Login</Link></li>
                  <li><Link to="/signup" className="btn btn-dark w-75 mx-auto">Signup</Link></li>
                </>
              ) : (
                <li>
                  <button className="btn btn-outline-dark w-75 mx-auto" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}

      </div>
    </nav>
  );
}
