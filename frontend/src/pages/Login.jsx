
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

function Login() {
  const location = useLocation();

  const [role, setRole] = useState(
    location.state?.role || "STUDENT"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setRole(location.state?.role || "STUDENT");
  }, [location.state]);

  const handleLogin = (e) => {
  e.preventDefault();

  const role = document.querySelector('select')?.value?.toLowerCase();

  if (role === "student") {
    window.location.href = "/student";
  } else if (role === "company") {
    window.location.href = "/company";
  } else if (role === "admin") {
    window.location.href = "/admin";
  } else {
    alert("Please select a role.");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back!</h2>

        <p>Login to College Internship Management Portal</p>

        <form onSubmit={handleLogin}>
          <label>Select Your Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="COMPANY">Company</option>
            <option value="ADMIN">College Admin</option>
          </select>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>Don't have an account? Registration coming next.</p>

        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}

export default Login;
