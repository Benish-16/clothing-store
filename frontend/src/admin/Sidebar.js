import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setSidebarOpen(false);
  };

  return (
    <>
    
      <nav className="mobile-navbar d-md-none">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
        <span className="navbar-title">Admin Dashboard</span>
      </nav>


      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Mobile Header */}
        <div className="sidebar-header d-md-none">
          <h5>Admin Panel</h5>
          <button
            className="close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

       
        <nav className="sidebar-links">
          <Link to="/" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
          <Link to="/men" onClick={() => setSidebarOpen(false)}>Men</Link>
          <Link to="/women" onClick={() => setSidebarOpen(false)}>Women</Link>
          <Link to="/Customerview" onClick={() => setSidebarOpen(false)}>Customers</Link>
          <Link to="/Contactview" onClick={() => setSidebarOpen(false)}>Contact</Link>
        </nav>

     
        {isLoggedIn && (
          <div className="mobile-logout d-md-none">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </aside>

 
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  );
}
