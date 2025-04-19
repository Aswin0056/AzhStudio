import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ added

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://studio-bd.onrender.com/api/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      // Store token and username
      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username);

      setSuccessMessage("Logged in successfully ✅"); // ✅ show success
      setError("");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError("Invalid email or password ❌");
      setSuccessMessage(""); // clear any previous success
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <center>
        <img src={logo} alt="Azh Studio Logo" style={{ width: "100px" }} />
      </center>
      <h2 className="login-title">Login</h2>

      {/* Message boxes */}
      {error && <div className="floating-error">{error}</div>}
     {successMessage && (
  <div className="floating-success">
    {successMessage}
  </div>
)}


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
