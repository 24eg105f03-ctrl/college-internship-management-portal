
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Backend and database connection will be added later.
    alert("Registration form is working! Backend will be connected later.");

    navigate("/login", { state: { role } });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2>Create Account</h2>

        <p>Join the College Internship Management Portal</p>

        <form onSubmit={handleSubmit}>

          <label>Register As</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="COMPANY">Company</option>
          </select>

          <label>
            {role === "STUDENT"
              ? "Student Name"
              : "Company Name"}
          </label>

          <input
            type="text"
            name="name"
            placeholder={
              role === "STUDENT"
                ? "Enter your full name"
                : "Enter company name"
            }
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            minLength={8}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            minLength={8}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login Here</Link>
        </p>

        <Link to="/">← Back to Home</Link>

      </div>
    </div>
  );
}

export default Register;
