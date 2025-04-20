// src/pages/Home.jsx
import expensaver from "../images/expensaver.png"; 
import AI from "../images/AI.png"; 
import logo from "../images/logo.png"; 
import Footer from "../pages/Footer";
import "../styles.css"

export default function Home() {
  const cardStyle = {
    width: "300px",
    margin: "1rem",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
    cursor: "pointer",
    
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "2rem",
  };

  return (
    <div className="home-container" style={{ textAlign: "center", padding: "2rem" }}>
      <img src={logo} alt="Azh Studio Logo" style={{ width: "100px", marginBottom: "1rem" }} />

      <h2 className="home-title">Welcome to Azh Studio</h2>
      <p className="home-subtitle">Our Projects.</p>

      <div style={containerStyle}>
        {/* Expensaver Card */}
        <div style={cardStyle}>
        <a href="https://expensaver.netlify.app/" className="card-dec" target="_blank" rel="noopener noreferrer">
          <h3>🚀 Expensaver</h3>       
  <img
    src={expensaver}
    alt="Expensaver Logo"
    style={{ width: "100px", margin: "1rem 0" }}
  />
</a>
          <p>
            A smart and simple expense tracker designed to help you keep track of your daily, weekly,
            and monthly expenses. Includes authentication, charts, and analytics.
          </p>
        </div>

        {/* Aswin's AI Card */}
        <div style={cardStyle}>
        <a href="https://lix-ai.netlify.app/" className="card-dec" target="_blank" rel="noopener noreferrer">
          <h3>🤖 LIX</h3>
          <img src={AI} alt="Aswin's AI Logo" style={{ width: "100px", margin: "1rem 0" }} /></a>
          <p>
            A conversational AI assistant with handcrafted replies and Google search fallback. Features
            dark mode, typing animations, and a clean UI.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
