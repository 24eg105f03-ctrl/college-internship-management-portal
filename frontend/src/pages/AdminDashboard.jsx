
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const BASE_URL = "http://localhost:8080/api";

export default function AdminDashboard() {
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    setLoading(true);
    setError("");

    try {
      const [internshipResponse, applicationResponse] =
        await Promise.all([
          fetch(`${BASE_URL}/internships`),
          fetch(`${BASE_URL}/applications`)
        ]);

      if (!internshipResponse.ok) {
        throw new Error(
          `Could not load internships (${internshipResponse.status})`
        );
      }

      if (!applicationResponse.ok) {
        throw new Error(
          `Could not load applications (${applicationResponse.status})`
        );
      }

      const internshipData = await internshipResponse.json();
      const applicationData = await applicationResponse.json();

      setInternships(
        Array.isArray(internshipData) ? internshipData : []
      );

      setApplications(
        Array.isArray(applicationData) ? applicationData : []
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const totalInternships = internships.length;
  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (app) => app.status === "PENDING"
  ).length;

  const totalCompanies = new Set(
    internships
      .map((internship) => internship.company?.trim())
      .filter(Boolean)
  ).size;

  return (
    <div className="dashboard-page">
      <header className="navbar">
        <h2>College Admin Dashboard</h2>
        <Link to="/">Back to Home</Link>
      </header>

      <main className="dashboard-content">
        <h1>Admin Overview</h1>
        <p>
          Monitor internships, companies, and student applications.
        </p>

        <button
          type="button"
          onClick={loadDashboard}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh Dashboard"}
        </button>

        {error && (
          <p style={{ color: "red" }}>
            Error: {error}
          </p>
        )}

        <section className="company-section">
          <h2>Dashboard Statistics</h2>

          <div className="internship-grid">
            <div className="internship-card">
              <h3>Total Internships</h3>
              <h2>{totalInternships}</h2>
            </div>

            <div className="internship-card">
              <h3>Companies Posting</h3>
              <h2>{totalCompanies}</h2>
            </div>

            <div className="internship-card">
              <h3>Total Applications</h3>
              <h2>{totalApplications}</h2>
            </div>

            <div className="internship-card">
              <h3>Pending Applications</h3>
              <h2>{pendingApplications}</h2>
            </div>
          </div>
        </section>

        <section className="company-section">
          <h2>All Internships</h2>

          {internships.length === 0 ? (
            <p>No internships available.</p>
          ) : (
            <div className="internship-grid">
              {internships.map((internship) => (
                <div
                  className="internship-card"
                  key={internship.id}
                >
                  <h3>{internship.title}</h3>

                  <p>
                    <strong>Company:</strong>{" "}
                    {internship.company}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {internship.location}
                  </p>

                  <p>
                    <strong>Stipend:</strong>{" "}
                    {internship.stipend}
                  </p>

                  <p>
                    <strong>Internship ID:</strong>{" "}
                    {internship.id}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="company-section">
          <h2>Student Applications</h2>

          {applications.length === 0 ? (
            <p>No applications available.</p>
          ) : (
            <div className="internship-grid">
              {applications.map((application) => {
                const internship = internships.find(
                  (item) =>
                    item.id === application.internshipId
                );

                return (
                  <div
                    className="internship-card"
                    key={application.id}
                  >
                    <h3>
                      {internship?.title ||
                        "Internship Application"}
                    </h3>

                    <p>
                      <strong>Student:</strong>{" "}
                      {application.studentName}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {application.studentEmail}
                    </p>

                    <p>
                      <strong>Company:</strong>{" "}
                      {internship?.company || "Not available"}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      {application.status}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
