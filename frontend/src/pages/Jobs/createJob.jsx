import { useState } from "react";
import { createJob } from "../../api/jobsApi";
import { useNavigate } from "react-router-dom";
import "../../styles/CreateJob.css";
import Navbar from "../../components/Navbar";

function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    position: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await createJob(form);

      setSuccess("Job created successfully!");

      setTimeout(() => {
        navigate("/jobs", { state: { created: true } });
      }, 800);

    } catch (err) {
      setError(err.response?.data||"Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="create-container">
      <div className="create-card">
        <h2>Create Job</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit} className="create-form">
          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) =>
              setForm({ ...form, company: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Position"
            value={form.position}
            onChange={(e) =>
              setForm({ ...form, position: e.target.value })
            }
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Job"}
          </button>
        </form>

        <button
          className="back-btn"
          onClick={() => navigate("/jobs")}
        >
          ⬅ Back to Jobs
        </button>
      </div>
    </div>
    </>
  );
}

export default CreateJob;