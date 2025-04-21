import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://studio-bd.onrender.com/api/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      // ✅ Store token based on stayLoggedIn checkbox
      const storage = stayLoggedIn ? localStorage : sessionStorage;
      storage.setItem("token", token);
      storage.setItem("username", user.username);

      setSuccessMessage("Logged in successfully ✅");
      setError("");
      setLoading(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      const serverMessage = err.response?.data?.message || "Invalid email or password ❌";
      setError(serverMessage);
      setSuccessMessage("");
      setLoading(false);
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
      {successMessage && <div className="floating-success">{successMessage}</div>}

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

      {/* ✅ Stay logged in checkbox */}
      <label className="stay-logged-in">
        <input
          type="checkbox"
          checked={stayLoggedIn}
          onChange={(e) => setStayLoggedIn(e.target.checked)}
        />
        Stay logged in
      </label>

      <button className="login-button" type="submit" disabled={loading}>
        {loading ? (
          <span className="spinner-with-text">
            <span className="spinner"></span> Logging in...
          </span>
        ) : (
          "Login"
        )}
      </button>

      <p className="owner-label">
        Created by <span>Aswin</span>
      </p>
    </form>
  );
}
