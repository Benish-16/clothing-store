import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authContext from "../context/auth/authContext";
import React, { useContext } from "react";
import "../App.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container-fluid px-4 px-lg-5">
    
        <Link
          to="/"
          className="navbar-brand fw-light mx-auto mx-lg-0"
          style={{ letterSpacing: "4px", fontWeight: 300 }}
        >
          {user?.admin ? `${capitalize(user?.name)} Dashboard` : "MINIMAL"}
        </Link>

        {!user?.admin && (
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {/* Menu */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center gap-3">
            {!user?.admin && (
              <>
                <li className="nav-item">
                  <Link to="/women" className="nav-link" onClick={() => setMenuOpen(false)}>WOMEN</Link>
                </li>
                <li className="nav-item">
                  <Link to="/men" className="nav-link" onClick={() => setMenuOpen(false)}>MEN</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>ABOUT</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex-row align-items-center gap-2">
            {!localStorage.getItem("token") ? (
              <>
                <li>
                  <Link to="/login" className="btn btn-outline-primary btn-sm">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="btn btn-primary btn-sm">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}

            {!user?.admin && (
              <li className="nav-item">
                <Link to="/cart" className="nav-link position-relative">
                  <i className="bi bi-bag fs-5"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
