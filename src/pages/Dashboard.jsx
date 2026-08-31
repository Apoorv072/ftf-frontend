import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAccounts } from "../services/accountService";

function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts();
        setAccounts(response);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
        setError("Unable to load account details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <div className="dashboard-page">Loading...</div>;
  }

  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">
          <h2>FTF</h2>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">

        <div className="welcome-section">
          <h1>Welcome back 👋</h1>
          <p>Manage your accounts and transactions.</p>
        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* Accounts */}
        <section className="accounts-section">

          <div className="section-header">
            <h2>Your Accounts</h2>

            <Link to="/create-account">
              <button className="create-account-button">
                + Create Account
              </button>
            </Link>
          </div>

          {accounts.length === 0 ? (
            <div className="empty-state">
              <p>You don't have any accounts yet.</p>

              <Link to="/create-account">
                <button className="create-account-button">
                  Create Your First Account
                </button>
              </Link>
            </div>
          ) : (
            <div className="accounts-grid">
              {accounts.map((account) => (
                <div className="account-card" key={account.id}>

                  <div className="account-card-header">
                    <span>{account.accountType}</span>
                    <span className="account-status">
                      {account.status}
                    </span>
                  </div>

                  <div className="account-balance">
                    <p>Available Balance</p>

                    <h2>
                      {account.currency} {account.balance}
                    </h2>
                  </div>

                  <div className="account-number">
                    <p>Account Number</p>
                    <strong>{account.accountNumber}</strong>
                  </div>

                  <div className="account-details">
                    <span>
                      Currency: {account.currency}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}

        </section>

        {/* Actions */}
        <section className="quick-actions">
          <h2>Quick Actions</h2>

          <div className="actions-grid">

            <button className="action-button">
              Transfer Money
            </button>

            <button className="action-button">
              Transactions
            </button>

            <button className="action-button">
              Limits
            </button>

          </div>
        </section>

      </main>
    </div>
  );
}

export default Dashboard;