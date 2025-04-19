import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import logo from "../images/logo.png"; 
import "../styles.css"

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();  // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("https://studio-bd.onrender.com/api/auth/register", {
        username,
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token); // Store token in localStorage for authenticated requests
      alert("Registered successfully!");
      
      // Redirect to login page after successful registration
      navigate("/login");  // Navigate to login page
    } catch (err) {
      setError(err.response ? err.response.data.message : "Server error");
    }
  };

  return (
    <form onSubmit={handleRegister} className="register-form">   
    <center><img src={logo} alt="Azh Studio Logo" style={{ width: "100px"}} /></center>  
      <h2 className="register-title">Register</h2>
      {error && <div className="floating-error">{error}</div>}
      <input
        className="register-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="register-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="register-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        className="register-input"
        type="password"
        placeholder="Re-enter Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button className="register-button" type="submit">Register</button>
      <p className="owner-label">Created by <span>Aswin</span></p>
    </form>
  );
}
