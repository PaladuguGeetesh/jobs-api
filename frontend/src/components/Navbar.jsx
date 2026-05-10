import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2 className="logo">JobApp</h2>

      <div className="nav-links">
        <button onClick={() => navigate("/jobs")}>
          Jobs
        </button>

        <button onClick={() => navigate("/createJob")}>
          Create Job
        </button>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;