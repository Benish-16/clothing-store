import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import authContext from "../context/auth/authContext";
import "../App.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(authContext);

  React.useEffect(() => {
    if (window.innerWidth >= 992) setMenuOpen(false);
    const handleResize = () => window.innerWidth >= 992 && setMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-white fixed-top py-3 sticky-top" style={{ zIndex: 1050 }}>
      <div className="container-fluid px-4 px-lg-5 d-flex align-items-center justify-content-between">


        <ul className="navbar-nav flex-row gap-4 d-none d-lg-flex">
          <li className="nav-item"><Link to="/women" className="nav-link">WOMEN</Link></li>
          <li className="nav-item"><Link to="/men" className="nav-link">MEN</Link></li>
          <li className="nav-item"><Link to="/about" className="nav-link">ABOUT</Link></li>
          <li className="nav-item"><Link to="/contact" className="nav-link">CONTACT</Link></li>
        </ul>

 
        <button
          className="navbar-toggler border-0 d-lg-none"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

     
        <div className="navbar-center flex-grow-1 d-flex justify-content-center">
          <Link
            to="/"
            className="navbar-brand fw-light"
            style={{ letterSpacing: "4px", fontWeight: 300 }}
          >
            MINIMAL
          </Link>
        </div>


        <Link to="/cart" className="nav-link d-lg-none">
          <i className="bi bi-bag fs-4"></i>
        </Link>

   
        <ul className="navbar-nav flex-row gap-4 d-none d-lg-flex align-items-center">
          {!localStorage.getItem("token") ? (
            <>
              <li><Link to="/login" className="btn btn mx-2">Login</Link></li>
              <li><Link to="/signup" className="btn btn primary mx-2">Signup</Link></li>
            </>
          ) : (
            <li><button className="btn btn" onClick={handleLogout}>Logout</button></li>
          )}
          <li>
            <Link to="/cart" className="nav-link">
              <i className="bi bi-bag"></i>
            </Link>
          </li>
        </ul>

        <div className={`collapse navbar-collapse d-lg-none ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav text-center py-4 gap-3">
            <li><Link to="/women" className="nav-link" onClick={() => setMenuOpen(false)}>WOMEN</Link></li>
            <li><Link to="/men" className="nav-link" onClick={() => setMenuOpen(false)}>MEN</Link></li>
            <li><Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>ABOUT</Link></li>
            <li><Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link></li>

            {!localStorage.getItem("token") ? (
              <>
                <li><Link to="/login" className="btn btn mx-2">Login</Link></li>
                <li><Link to="/signup" className="btn btn primary mx-2">Signup</Link></li>
              </>
            ) : (
              <li><button className="btn btn" onClick={handleLogout}>Logout</button></li>
            )}
          </ul>
        </div>

      </div>
    </nav>
  );
}
