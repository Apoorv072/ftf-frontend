import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAccounts, getName } from "../services/accountService";
import ftfLogo from "../assets/ftf-logo-frontend.png";
import ftfBackground from "../assets/ftf-background-dashboad.png";

function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const Name =  getName();
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts();
        setAccounts(response);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
        setError("Unable to load your accounts.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAccounts();
  }, []);

const [showLogoutPopup, setShowLogoutPopup] = useState(false);

const handleLogout = () => {
  setShowLogoutPopup(true);
};

const confirmLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

const cancelLogout = () => {
  setShowLogoutPopup(false);
};

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Header */}
      {/* <header className="dashboard-header">
        <div className="dashboard-logo">
          Financial Transaction Fabric 
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header> */}
      {/* Header */}
<header className="dashboard-header">
  <div className="dashboard-logo">
    <img
      src={ftfLogo}
      alt="Financial Transaction Fabric"
      className="ftf-logo"
    />
    Financial Transaction Fabric 
  </div>

  <button
    className="logout-button"
    onClick={handleLogout}
  >
    Logout
  </button>
</header>

    <div
      className="auth-container"
      style={{ backgroundImage: `url(${ftfBackground})` }}
    >
      {/* Main */}
      <main className="dashboard-content">

        {/* Welcome */}
        <section className="welcome-section">
          <span className="dashboard-label">
            DASHBOARD
          </span>

          <h1>Welcome {Name}</h1>

          <p>
            Manage your accounts and transactions.
          </p>
        </section>

        {/* Error */}
        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        {/* Accounts */}
        <section className="accounts-section">

          <div className="section-heading">
            <div>
              <h2>Your Accounts</h2>
              <span>
                {accounts.length}{" "}
                {accounts.length === 1
                  ? "account"
                  : "accounts"}
              </span>
            </div>

            <Link to="/create-account">
              <button className="create-button">
                + Create Account
              </button>
            </Link>
          </div>

          {accounts.length === 0 ? (
            <div className="empty-account">
              <h3>No accounts yet</h3>

              <p>
                Create an account to start using FTF.
              </p>

              <Link to="/create-account">
                <button className="create-button">
                  Create Account
                </button>
              </Link>
            </div>
          ) : (
            <div className="accounts-grid">

              {accounts.map((account) => (
                <div
                  className="account-card"
                  key={account.id}
                >

                  <div className="account-top">
                    <div>
                      <span className="account-type">
                        {account.accountType}
                      </span>

                      <p>Account</p>
                    </div>

                    <span className="account-status">
                      {account.status}
                    </span>
                  </div>

                  <div className="account-balance">
                    <span>Available Balance</span>

                    <h3>
                      {account.currency}{" "}
                      {Number(account.balance).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }
                      )}
                    </h3>
                  </div>

                  <div className="account-number">
                    <span>Account Number</span>

                    <strong>
                      {account.accountNumber}
                    </strong>
                  </div>

                  <div className="account-footer">
                    <span>
                      {account.currency}
                    </span>

                    <span>
                      Account ID: {account.id}
                    </span>
                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

        {/* Quick Actions */}
        <section className="quick-actions">

          <div className="section-heading">
            <div>
              <h2>Quick Actions</h2>
              <span>Frequently used features</span>
            </div>
          </div>

          <div className="actions-grid">

            <Link
              to="/transaction"
              className="action-card"
            >
              <div className="action-arrow">
                →
              </div>

              <div>
                <h3>Transfer Money</h3>
                <p>
                  Send money to another account
                </p>
              </div>
            </Link>

            <Link to="/transaction-history" className="action-card">
             <div className="action-arrow">
                 →
             </div>

            <div>
             <h3>Transaction History</h3>
            <p>View your recent transactions</p>
           </div>
          </Link>

          
               {/* Add Quick Actions  for limits in future if needed */}
          </div>

        </section>

      </main>
      </div>
 {showLogoutPopup && (
  <div className="logout-overlay">
    <div className="logout-popup">
      <h3>Log out?</h3>
      <p>Are you sure you want to log out of your account?</p>

      <div className="logout-actions">
        <button className="logout-no" onClick={cancelLogout}>
          No
        </button>

        <button className="logout-yes" onClick={confirmLogout}>
          Yes
        </button>
      </div>
    </div>
  </div>
)}
    </div>
    /**                       popup */
    
  );
 
}

export default Dashboard;