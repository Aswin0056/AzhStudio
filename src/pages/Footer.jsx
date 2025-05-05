// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "../styles.css";

export default function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(145deg, #1a1a1a, #444)",
      color: "#fff",
      padding: "2rem",
      textAlign: "center",
      borderTop: "2px solid #fff",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      marginTop: "3rem",
    }}>
      <div style={{
        fontSize: "1.0rem",
        marginBottom: "1rem",
      }}>
        <p>© {new Date().getFullYear()}<strong style={{ color: 'goldenrod' }}> Azh</strong><strong style={{ color: 'black' }}>Studio</strong>. All rights reserved.</p>
        <p style={{ fontSize: "0.6rem", opacity: 0.75 }}>
          Built by Aswin with 🤍 & creativity.
        </p>
      </div>

      <div style={{
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
  marginTop: "2rem",
}}>
  <Link to="/about" style={{
    color: "#fff",
    textDecoration: "none",
    padding: "0.70rem 1.0rem", // increased padding
    fontSize: "0.7rem", // larger text
    background: "#333",
    borderRadius: "40px", // smoother look
    transition: "all 0.3s ease",
  }} 
  onMouseOver={(e) => e.target.style.background = "#444"} 
  onMouseOut={(e) => e.target.style.background = "#333"}>
    About
  </Link>
  <Link to="/contact" style={{
    color: "#fff",
    textDecoration: "none",
    padding: "0.70rem 1.0rem", // increased padding
    fontSize: "0.7rem",
    background: "#333",
    borderRadius: "40px",
    transition: "all 0.3s ease",
  }}
  onMouseOver={(e) => e.target.style.background = "#444"} 
  onMouseOut={(e) => e.target.style.background = "#333"}>
    Contact
  </Link>
  <Link to="/download" style={{
    color: "#fff",
    textDecoration: "none",
    padding: "0.70rem 1.0rem", // increased padding
    fontSize: "0.7rem",
    background: "#333",
    borderRadius: "40px",
    transition: "all 0.3s ease",
  }}
  onMouseOver={(e) => e.target.style.background = "#444"} 
  onMouseOut={(e) => e.target.style.background = "#333"}>
    DOA
  </Link>
</div>

    </footer>
  );
}
