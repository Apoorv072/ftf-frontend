import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>FTF Dashboard</h1>

        <p>Welcome to Financial Transaction Fabric</p>

        <Link to="/create-account">
          <button>Create Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

