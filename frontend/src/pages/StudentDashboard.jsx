
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const INTERNSHIP_API = "http://localhost:8080/api/internships";
const APPLICATION_API = "http://localhost:8080/api/applications";

function StudentDashboard() {
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(INTERNSHIP_API)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load internships");
        return res.json();
      })
      .then(setInternships)
      .catch((err) => setError(err.message));
  }, []);

  async function loadApplications(email) {
    if (!email.trim()) return;

    try {
      const response = await fetch(
        `${APPLICATION_API}?email=${encodeURIComponent(email)}`
      );

      if (!response.ok) throw new Error("Failed to load applications");

      setApplications(await response.json());
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function applyInternship(internshipId) {
    if (!studentName.trim() || !studentEmail.trim()) {
      alert("Please enter your name and email first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(APPLICATION_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          internshipId,
          studentName: studentName.trim(),
          studentEmail: studentEmail.trim()
        })
      });

      if (!response.ok) {
        throw new Error("Application could not be submitted");
      }

      await loadApplications(studentEmail.trim());
      alert("Application submitted successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const appliedIds = applications.map((app) => app.internshipId);

  return (
    <div className="dashboard-page">
      <header className="navbar">
        <h2>Student Dashboard</h2>
        <Link to="/">Back to Home</Link>
      </header>

      <main className="dashboard-content">
        <h1>Available Internships</h1>

        <section className="company-section">
          <h2>Student Information</h2>
          <div className="company-form">
            <input
              type="text"
              placeholder="Your Full Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Your Email Address"
              value={studentEmail}
              onChange={(e) => {
                setStudentEmail(e.target.value);
                setApplications([]);
              }}
            />

            <button
              type="button"
              onClick={() => loadApplications(studentEmail)}
            >
              Load My Applications
            </button>
          </div>
        </section>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="internship-grid">
          {internships.map((internship) => {
            const application = applications.find(
              (app) => app.internshipId === internship.id
            );

            return (
              <div className="internship-card" key={internship.id}>
                <h3>{internship.title}</h3>
                <p><strong>Company:</strong> {internship.company}</p>
                <p><strong>Location:</strong> {internship.location}</p>
                <p><strong>Stipend:</strong> {internship.stipend}</p>

                <button
                  type="button"
                  disabled={loading || appliedIds.includes(internship.id)}
                  onClick={() => applyInternship(internship.id)}
                >
                  {application
                    ? `Status: ${application.status}`
                    : "Apply Now"}
                </button>
              </div>
            );
          })}
        </div>

        {internships.length === 0 && (
          <p>No internships available yet.</p>
        )}

        <section className="company-section">
          <h2>My Applications</h2>

          {applications.length === 0 && (
            <p>No applications loaded.</p>
          )}

          {applications.map((application) => {
            const internship = internships.find(
              (item) => item.id === application.internshipId
            );

            return (
              <div className="internship-card" key={application.id}>
                <h3>{internship?.title || "Internship"}</h3>
                <p>Status: {application.status}</p>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;
