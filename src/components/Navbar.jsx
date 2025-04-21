import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logosmall from "../images/logonamesmall.png";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className="nav-container"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
        margin: "1rem",
      }}
    >
      <img src={logosmall} alt="Logo" style={{ width: "110px", marginLeft: "1rem" }} />

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {isLoggedIn && (
          <Link to="/dashboard">Dashboard</Link> // ✅ Show Dashboard link only if logged in
        )}

        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>

      <button className="navbar-toggle" onClick={() => setShowDropdown(!showDropdown)}>
        ☰
      </button>

      <div className={`navbar-dropdown ${showDropdown ? "show" : ""}`}>
        <Link to="/" onClick={() => setShowDropdown(false)}>
          Home
        </Link>

        {isLoggedIn && (
          <Link to="/dashboard" onClick={() => setShowDropdown(false)}>
            Dashboard
          </Link> // ✅ Show Dashboard link in dropdown if logged in
        )}

        {isLoggedIn ? (
          <button
            onClick={() => {
              setShowDropdown(false);
              handleLogout();
            }}
            className="logout-button"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" onClick={() => setShowDropdown(false)}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
