import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAccounts } from "../services/accountService";
import { createTransaction } from "../services/transactionService";
import ftfLogo from "../assets/ftf-logo-frontend.png";

function Transaction() {
  const [accounts, setAccounts] = useState([]);
  const [sourceAccountNumber, setSourceAccountNumber] = useState("");
  const [destinationAccountNumber, setDestinationAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts();

        setAccounts(response);

        if (response.length > 0) {
          setSourceAccountNumber(response[0].accountNumber);
          setCurrency(response[0].currency);
        }
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
  const handleTransaction = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await createTransaction({
        sourceAccountNumber,
        destinationAccountNumber,
        amount: Number(amount),
        currency,
        transactionType: "TRANSFER",
        description
      });

      console.log("Transaction successful:", response);

      setSuccess("Transaction completed successfully.");

      setDestinationAccountNumber("");
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error("Transaction failed:", error);

      setError(
        error.response?.data?.message ||
        "Transaction failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="dashboard-page">Loading accounts...</div>;
  }

  if (accounts.length === 0) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-content">
          <div className="transaction-card">
            <h1>Transfer Money</h1>
            <p>You need an account before you can make a transfer.</p>

            <Link to="/create-account">
              <button>Create Account</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
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

      <main className="dashboard-content">
        <div className="transaction-card">

          <h1>Transfer Money</h1>
          <p>Transfer funds between FTF accounts.</p>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {success && (
            <p className="success-message">
              {success}
            </p>
          )}

          <form onSubmit={handleTransaction}>

            <div className="form-group">
              <label>From Account</label>

              <select
                value={sourceAccountNumber}
                onChange={(event) =>
                  setSourceAccountNumber(event.target.value)
                }
                required
              >
                {accounts.map((account) => (
                  <option
                    key={account.id}
                    value={account.accountNumber}
                  >
                    {account.accountType} - {account.accountNumber}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Destination Account</label>

              <input
                type="text"
                placeholder="Enter destination account number"
                value={destinationAccountNumber}
                onChange={(event) =>
                  setDestinationAccountNumber(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Amount</label>

              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Currency</label>

              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>

              <input
                type="text"
                placeholder="Enter transaction description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
              />
            </div>

            <button type="submit" disabled={submitting}>
              {submitting ? "Processing..." : "Transfer Money"}
            </button>

          </form>
        </div>
      </main>
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
  );
}

export default Transaction;
