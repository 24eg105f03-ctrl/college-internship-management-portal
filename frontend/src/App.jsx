
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const goToLogin = (role) => {
    navigate("/login", { state: { role } });
  };

  return (
    <div className="app">
      <header className="navbar">
        <h2>🎓 Internship Portal</h2>

        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>

        <button
          className="login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </header>

      <main id="home" className="hero">
        <h1>College Internship Management Portal</h1>

        <p>
          Connect with opportunities, apply for internships,
          and grow your career.
        </p>

        <div className="hero-buttons">
          <button onClick={() => goToLogin("STUDENT")}>
            Explore Internships
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/register")}
          >
            Register Now
          </button>
        </div>
      </main>

      <section id="features" className="features">
        <h2>Choose Your Role</h2>

        <div className="cards">
          <div className="card">
            <h3>🎓 Student</h3>
            <p>
              Create your profile, explore internships,
              apply and track applications.
            </p>

            <button onClick={() => goToLogin("STUDENT")}>
              Student Login
            </button>
          </div>

          <div className="card">
            <h3>🏢 Company</h3>
            <p>
              Post internships, review student applications,
              and manage recruitment.
            </p>

            <button onClick={() => goToLogin("COMPANY")}>
              Company Login
            </button>
          </div>

          <div className="card">
            <h3>🏛️ College Admin</h3>
            <p>
              Manage students, monitor internship applications,
              and generate reports.
            </p>

            <button onClick={() => goToLogin("ADMIN")}>
              Admin Login
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About the Portal</h2>

        <p>
          A centralized platform connecting students,
          companies, and colleges to simplify the
          internship management process.
        </p>
      </section>

      <footer>
        <p>© 2026 College Internship Management Portal</p>
      </footer>
    </div>
  );
}

export default App;
