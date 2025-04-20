// src/components/Footer.jsx
import "../styles.css"
export default function Footer() {
    return (
      <footer style={{
        backgroundColor: "rgba(0, 0, 0, 0.79)",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        marginTop: "3rem",
      }}>
        <p>© {new Date().getFullYear()}<strong style={{"color":'black'}}> Azh</strong><strong style={{"color":'goldenrod'}}>Studio</strong>. All rights reserved.</p>
        <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
          Built by Aswin with 🤍 & creativity.
        </p>
      </footer>
    );
  }
  