import {Link, useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import authContext from "../context/auth/authContext";
import React, { useContext } from "react";
import '../App.css';



export default function Navbar() {
 const [menuOpen, setMenuOpen] = React.useState(false);


 React.useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 992) {
      setMenuOpen(false);
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
     const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  
  let location =useLocation();
  React.useEffect(()=>{
  console.log(location.pathname);

},[location]);
    const { user } = useContext(authContext);
    
  
  return (
    <nav className="navbar bg-white fixed-top py-3  sticky-top"  style={{ zIndex: 1050 }}>
      <div className="container-fluid px-4 px-lg-5 d-flex align-items-center justify-content-between">
{!user?.admin && (
        <ul className="navbar-nav flex-row gap-4 d-none d-lg-flex">
          <li className="nav-item">
            <Link to="/women" className="nav-link">WOMEN</Link>
          </li>
          <li className="nav-item">
            <Link to="/men" className="nav-link">MEN</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">ABOUT</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">CONTACT</Link>
          </li>
        </ul>)}

      
        <div className="navbar-center flex-grow-1 d-flex justify-content-center">
          <Link 
            to="/" 
            className="navbar-brand fw-light"
            style={{ letterSpacing: '4px', fontWeight: 300 }}
          >
          {user?.admin 
  ? `${capitalize(user?.name)} Dashboard` 
  : "MINIMAL"}

          </Link>
        </div>
       
        <ul className="navbar-nav flex-row gap-4 d-none d-lg-flex">
           {!localStorage.getItem('token')? <form className="d-flex" role="search">
        <Link to="/login" className="btn btn mx-2" type="submit">Login </Link>
        <Link to ="/signup" className="btn btn primary mx-2" type="submit">Signup</Link>
      </form>: <button className="btn btn" onClick={handleLogout}>Logout</button>
      }
             {!user?.admin &&(
          <li className="nav-item">
            <Link to="/cart" className="nav-link"><i className="bi bi-bag"></i></Link>
          </li>)}
        </ul>

    
          {!user?.admin &&(
       <button
  className="navbar-toggler border-0 d-lg-none ms-auto"
  type="button"
  onClick={() => setMenuOpen(!menuOpen)}
>
  <span className="navbar-toggler-icon"></span>
</button>
)}

    
      <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">

          <ul className="navbar-nav text-center py-4 gap-3">
        
            <li><Link to="/women" className="nav-link">WOMEN</Link></li>
            <li><Link to="/men" className="nav-link">MEN</Link></li>
            <li><Link to="/about" className="nav-link">ABOUT</Link></li>
            <li><Link to="/contact" className="nav-link">CONTACT</Link></li>
               {!localStorage.getItem('token')? <form className="d-flex" role="search">
        <Link to="/login" className="btn btn mx-2" type="submit">Login </Link>
        <Link to ="/signup" className="btn btn primary mx-2" type="submit">Signup</Link>
      </form>: <button className="btn btn" onClick={handleLogout}>Logout</button>
      }
            <li><Link to="/cart" className="nav-link"><i className="bi bi-bag"></i> </Link></li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
