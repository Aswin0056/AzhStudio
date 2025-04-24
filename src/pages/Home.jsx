import { useState, useEffect } from "react";
import expensaver from "../images/expensaver.png";
import AI from "../images/AI.png";
import logo from "../images/logo.png";
import Footer from "../pages/Footer";
import "../styles.css";

export default function Home() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ name: "", gmail: "", comment: "" });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch("https://studio-bd.onrender.com/api/get-comments");
      const data = await res.json();
      setComments(data.reverse()); // Show latest first
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

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
        fetchComments(); // Refresh comment list
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMsg("Failed to submit comment ❌");
        setTimeout(() => setErrorMsg(""), 3000);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setErrorMsg("Something went wrong 😢");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  return (
    <div className="home-container" style={{ textAlign: "center", padding: "2rem" }}>
      {successMessage && <p className="floating-success">{successMessage}</p>}
      {errorMsg && <p className="floating-error">{errorMsg}</p>}

      <img src={logo} alt="Azh Studio Logo" style={{ width: "100px", marginBottom: "1rem" }} />
      <h2 className="home-title">Welcome to Azh Studio</h2>
      <p className="home-subtitle">Our Projects.</p>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
        {/* Project Cards */}
        <div style={{ width: "300px", margin: "1rem", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff", textAlign: "center", cursor: "pointer" }}>
          <a href="https://expensaver.netlify.app/" className="card-dec" target="_blank" rel="noopener noreferrer">
            <h3>🚀 Expensaver</h3>
            <img src={expensaver} alt="Expensaver" style={{ width: "100px", margin: "1rem 0" }} />
          </a>
          <p>Track your expenses with ease. Includes login, analytics, and a clean UI.</p>
        </div>

        <div style={{ width: "300px", margin: "1rem", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff", textAlign: "center", cursor: "pointer" }}>
          <a href="https://lix-ai.netlify.app/" className="card-dec" target="_blank" rel="noopener noreferrer">
            <h3>🤖 LIX</h3>
            <img src={AI} alt="LIX" style={{ width: "100px", margin: "1rem 0" }} />
          </a>
          <p>A personal AI assistant with typing animations, Google fallback, and dark mode.</p>
        </div>
      </div>

{/* 🧑‍💻 About Us Section */}
<div className="about-container">
  <h3 className="about-title">✨ About Azh Studio</h3>
  <p className="about-text">
    Welcome to <strong>Azh Studio</strong> — a place where creativity meets technology. We’re a team of passionate developers, designers, and dreamers who build powerful web and AI applications to make everyday life easier and more productive.
  </p>
  <p className="about-text">
    Our mission is to craft clean, intuitive, and impactful digital experiences. From managing expenses with <strong>Expensaver</strong> 💸 to engaging in smart conversations with <strong>LIX</strong> 🤖, every project we launch is driven by innovation and a love for solving real problems.
  </p>
  <p className="about-text">
    Stay tuned for more tools and projects — we’re just getting started 🚀
  </p>
</div>



      {/* 💬 Comments Section */}
      <div className="comments-section" style={{ marginTop: "3rem", maxWidth: "600px", marginInline: "auto" }}>
        <h3>💬 Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} style={{ padding: "1rem", marginBottom: "1rem", textAlign: "left" }}>
              <img src={`${process.env.PUBLIC_URL}/users-logo.png`} alt="logo" className="users-logo" />
              <p className="comment-name" style={{ marginBottom: "0.25rem" }}><strong>{comment.name}</strong></p>
              <p style={{ color: "#555", fontSize: "0.8rem", marginLeft: "10px" }}>{comment.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* 📝 Comment Form */}
      <div className="comment-box" style={{ marginTop: "2rem" }}>
        <h3>Leave a Comment</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="gmail" placeholder="Your Gmail" value={formData.gmail} onChange={handleChange} required />
          <textarea name="comment" placeholder="Your Comment" rows="4" value={formData.comment} onChange={handleChange} required />
          <button type="submit">Submit Comment</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
