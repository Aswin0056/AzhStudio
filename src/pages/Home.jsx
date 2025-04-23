// src/pages/Home.jsx
import expensaver from "../images/expensaver.png"; 
import AI from "../images/AI.png"; 
import logo from "../images/logo.png"; 
import Footer from "../pages/Footer";
import "../styles.css"
import { useState } from "react";

export default function Home() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
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



  const [formData, setFormData] = useState({ name: "", gmail: "", comment: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://studio-bd.onrender.com/api/add-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        setSuccessMessage("Comment submitted ✅");
        setFormData({ name: "", gmail: "", comment: "" });
  
        // Clear the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMsg("Failed to submit comment ❌");
  
        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setErrorMsg("Something went wrong 😢");
  
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };
  
  

  return (
    <div className="home-container" style={{ textAlign: "center", padding: "2rem" }}>
     {/* Display Success Message if set */}
     {successMessage && (
        <p className="floating-success">{successMessage}</p>
      )}
      {errorMsg && (
        <p className="floating-error">{errorMsg}</p>
      )}
      <img src={logo} alt="Azh Studio Logo" style={{ width: "100px", marginBottom: "1rem" }} />

      <h2 className="home-title">Welcome to Azh Studio</h2>
      <p className="home-subtitle">Our Projects.</p>

      <div style={containerStyle}>
        {/* Expensaver Card */}
        <div style={cardStyle}>
          <a href="https://expensaver.netlify.app/" className="card-dec" target="_blank" rel="noopener noreferrer">
            <h3>🚀 Expensaver</h3>       
            <img src={expensaver} alt="Expensaver Logo" style={{ width: "100px", margin: "1rem 0" }} />
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
            <img src={AI} alt="Aswin's AI Logo" style={{ width: "100px", margin: "1rem 0" }} />
          </a>
          <p>
            A Personal AI assistant with handcrafted replies and Google search fallback. Features
            dark mode, typing animations, and a clean UI.
          </p>
        </div>
      </div>

      {/* Comment Box Section */}
      <div className="comment-box">
  <h3>Leave a Comment</h3>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="name"
      placeholder="Your Name"
      value={formData.name}
      onChange={handleChange}
      required
    />
    <input
      type="email"
      name="gmail"
      placeholder="Your Gmail"
      value={formData.gmail}
      onChange={handleChange}
      required
    />
    <textarea
      name="comment"
      placeholder="Your Comment"
      rows="4"
      value={formData.comment}
      onChange={handleChange}
      required
    />
    <button type="submit">Submit Comment</button>
  </form>
</div>


      <Footer />
    </div>
  );
}
