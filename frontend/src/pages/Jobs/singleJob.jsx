import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAJob, updateJob } from "../../api/jobsApi";
import "../../styles/SingleJob.css";
import Navbar from "../../components/Navbar";

function SingleJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    position: ""
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  // 🔁 Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getAJob(id);

        setForm({
          company: res.data.job.company,
          position: res.data.job.position
        });

      } catch (err) {
        setMessage(err.response.data||"Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // 🔁 Update job
  const handleUpdate = async (e) => {
    e.preventDefault();

    setUpdating(true);
    setMessage("");

    try {
      await updateJob(form, id);

      setMessage("Job updated successfully!");

      setTimeout(() => {
        navigate("/jobs", { state: { updated: true } });
      }, 800);

    } catch (err) {
      setMessage(err.response?.data||"Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <h2>Loading job...</h2>;

  return (
    <>
    <Navbar/>
    <div className="update-container">
      <div className="update-card">
        <h2>Edit Job</h2>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleUpdate} className="update-form">
          <input
            placeholder="Company"
            value={form.company}
            onChange={(e) =>
              setForm({ ...form, company: e.target.value })
            }
          />

          <input
            placeholder="Position"
            value={form.position}
            onChange={(e) =>
              setForm({ ...form, position: e.target.value })
            }
          />

          <button type="submit" disabled={updating}>
            {updating ? "Updating..." : "Update Job"}
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

export default SingleJob;