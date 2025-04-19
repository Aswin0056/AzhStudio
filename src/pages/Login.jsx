import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username); // Save username to localStorage

      alert("Logged in successfully!");
      navigate("/dashboard"); // Navigate directly to the dashboard
    } catch (err) {
      setError("Invalid email or password");
    }
  };

 
  return (
    <form onSubmit={handleLogin} className="login-form">
      <center>
        <img src={logo} alt="Azh Studio Logo" style={{ width: "100px" }} />
      </center>
      <h2 className="login-title">Login</h2>
      {error && <div className="error-message">{error}</div>}
      <input
        className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="login-button" type="submit">
        Login
      </button>
      <p className="owner-label">
        Created by <span>Aswin</span>
      </p>
    </form>
  );
}
