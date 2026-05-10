import { useState, useEffect } from "react";
import { getJobs } from "../../api/jobsApi";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteJob } from "../../api/jobsApi";
import "../../styles/Jobs.css";
import Navbar from "../../components/Navbar";

function Jobs() {
  const navigate = useNavigate();
  const location = useLocation();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getJobs();
      setJobs(res.data.jobs || res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, []);

    

const handleDelete = async (id) => {
  try {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    await deleteJob(id);

    // update UI instantly
    setJobs((prevJobs) =>
      prevJobs.filter((job) => job._id !== id)
    );

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

  return (
    <>
    <Navbar/>
    <div className="jobs-container">
      <h1>Jobs Dashboard</h1>

      {location.state?.updated && (
        <p className="success">Job updated successfully!</p>
      )}

      <button
        className="create-btn"
        onClick={() => navigate("/createJob")}
      >
        ➕ Create Job
      </button>

      <div className="jobs-list">
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.company}</h3>
              <p>{job.position}</p>

              <button
                className="edit-btn"
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(job._id)}
                >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>

    </>
  );
}

export default Jobs;