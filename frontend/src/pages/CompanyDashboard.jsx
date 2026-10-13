
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

export default function CompanyDashboard() {
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [stipend, setStipend] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadInternships() {
    try {
      const response = await fetch(`${API}/internships`);
      if (!response.ok) throw new Error("Could not load internships");

      const data = await response.json();
      setInternships(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    loadInternships();
  }, []);

  function clearForm() {
    setTitle("");
    setCompany("");
    setLocation("");
    setStipend("");
    setEditingId(null);
  }

  async function saveInternship(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const url = editingId === null
        ? `${API}/internships`
        : `${API}/internships/${editingId}`;

      const response = await fetch(url, {
        method: editingId === null ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, company, location, stipend })
      });

      if (!response.ok) {
        throw new Error(`Save failed (${response.status})`);
      }

      clearForm();
      await loadInternships();
      setMessage("Internship saved successfully!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  function editInternship(internship) {
    setEditingId(internship.id);
    setTitle(internship.title || "");
    setCompany(internship.company || "");
    setLocation(internship.location || "");
    setStipend(internship.stipend || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteInternship(id) {
    const hasApplications = applications.some(
      (application) => application.internshipId === id
    );

    if (hasApplications) {
      alert("This internship has applications. Do not delete it.");
      return;
    }

    if (!window.confirm("Delete this internship?")) return;

    try {
      const response = await fetch(`${API}/internships/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error(`Delete failed (${response.status})`);
      }

      await loadInternships();
      setMessage("Internship deleted successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function loadApplications() {
    try {
      const response = await fetch(`${API}/applications`);
      if (!response.ok) throw new Error("Could not load applications");

      setApplications(await response.json());
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="dashboard-page">
      <header className="navbar">
        <h2>Company Dashboard</h2>
        <Link to="/">Back to Home</Link>
      </header>

      <main className="dashboard-content">
        <h1>Manage Internships</h1>

        {message && <p role="status">{message}</p>}

        <section className="company-section">
          <h2>
            {editingId === null
              ? "Post New Internship"
              : "Edit Internship"}
          </h2>

          <form className="company-form" onSubmit={saveInternship}>
            <input
              placeholder="Internship Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />

            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <input
              placeholder="Stipend"
              value={stipend}
              onChange={(e) => setStipend(e.target.value)}
            />

            <button type="submit" disabled={saving}>
              {saving
                ? "Saving..."
                : editingId === null
                  ? "Post Internship"
                  : "Save Changes"}
            </button>

            {editingId !== null && (
              <button type="button" onClick={clearForm}>
                Cancel Edit
              </button>
            )}
          </form>
        </section>

        <section className="company-section">
          <h2>Posted Internships</h2>

          {internships.length === 0 && (
            <p>No internships posted yet.</p>
          )}

          <div className="internship-grid">
            {internships.map((internship) => (
              <div className="internship-card" key={internship.id}>
                <h3>{internship.title}</h3>
                <p>Company: {internship.company}</p>
                <p>Location: {internship.location}</p>
                <p>Stipend: {internship.stipend}</p>

                <button
                  type="button"
                  onClick={() => editInternship(internship)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteInternship(internship.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="company-section">
          <h2>Student Applications</h2>

          <button type="button" onClick={loadApplications}>
            View Applications
          </button>

          {applications.length === 0 && (
            <p>No applications loaded.</p>
          )}

          <div className="internship-grid">
            {applications.map((application) => {
              const internship = internships.find(
                (item) => item.id === application.internshipId
              );

              return (
                <div className="internship-card" key={application.id}>
                  <h3>{internship?.title || "Internship Application"}</h3>
                  <p>Student: {application.studentName}</p>
                  <p>Email: {application.studentEmail}</p>
                  <p>Status: {application.status}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
