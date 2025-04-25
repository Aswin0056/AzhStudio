import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute"; // ✅ Adjust path if needed
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {

  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
            {/* ✅ Protected Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        </Routes>
      </Router>
  );
}

export default App;

