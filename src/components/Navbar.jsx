import { Link } from "react-router-dom";
import { useState } from "react";
import logosmall from "../images/logonamesmall.png";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="nav-container" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", backgroundColor: "white", borderRadius: "20px", boxShadow: "0 1px 1px rgba(0,0,0,0.1)", margin: "1rem" }}>
      <img src={logosmall} alt="Logo" style={{ width: "110px", marginLeft: "1rem" }} />

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

      <button
        className="navbar-toggle"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        ☰
      </button>

      <div className={`navbar-dropdown ${showDropdown ? "show" : ""}`}>
        <Link to="/" onClick={() => setShowDropdown(false)}>Home</Link>
        <Link to="/login" onClick={() => setShowDropdown(false)}>Login</Link>
        <Link to="/register" onClick={() => setShowDropdown(false)}>Register</Link>
      </div>
    </nav>
  );
}
