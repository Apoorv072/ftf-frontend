import { useEffect, useState } from "react";
import { getAccounts } from "../services/accountService";
import { getTransactionsByAccountNumber } from "../services/transactionService";
import { useNavigate } from "react-router-dom";
import ftfLogo from "../assets/ftf-logo-frontend.png";
import ftfBackground from "../assets/ftf-background-txn-history.png";

function TransactionHistory() {

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [error, setError] = useState("");

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts();

        setAccounts(response);

        if (response.length > 0) {
          setSelectedAccount(response[0].accountNumber);
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

  useEffect(() => {

    if (!selectedAccount) {
      return;
    }

    const fetchTransactions = async () => {

      try {
        setTransactionLoading(true);
        setError("");

        const response =
          await getTransactionsByAccountNumber(selectedAccount);

        setTransactions(response);

      } catch (error) {

        console.error("Failed to fetch transactions:", error);

        setError("Unable to load transaction history.");
        setTransactions([]);

      } finally {
        setTransactionLoading(false);
      }
    };

    fetchTransactions();

  }, [selectedAccount]);


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


  const formatDate = (dateTime) => {

    if (!dateTime) {
      return "-";
    }

    return new Date(dateTime).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };


  const formatAmount = (transaction) => {

    const isReceived =
      transaction.destinationAccountNumber === selectedAccount;

    const sign = isReceived ? "+" : "-";

    return `${sign} ${transaction.currency} ${Number(
      transaction.amount
    ).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };


  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading transaction history...
      </div>
    );
  }


  return (
    <div className="dashboard-page">

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

      {/* Main Content */}

      <main className="dashboard-content">

        <div className="history-page">

          <div className="welcome-section">

            <span className="dashboard-label">
              TRANSACTIONS
            </span>

            <h1>
              Transaction History
            </h1>

            <p>
              View all transactions associated with your account.
            </p>

          </div>


          {/* Account Selector */}

          <div className="history-filter">

            <div>

              <label>
                Account
              </label>

              <select
                value={selectedAccount}
                onChange={(event) =>
                  setSelectedAccount(event.target.value)
                }
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

          </div>


          {/* Error */}

          {error && (
            <div className="dashboard-error">
              {error}
            </div>
          )}


          {/* Transaction Section */}

          <section className="transaction-history-section">

            <div className="section-heading">

              <div>
                <h2>
                  Recent Transactions
                </h2>

                <span>
                  {transactions.length} transaction
                  {transactions.length !== 1 ? "s" : ""}
                </span>
              </div>

            </div>


            {transactionLoading ? (

              <div className="history-loading">
                Loading transactions...
              </div>

            ) : transactions.length === 0 ? (

              <div className="empty-account">

                <h3>
                  No transactions yet
                </h3>

                <p>
                  Transactions associated with this account
                  will appear here.
                </p>

              </div>

            ) : (

              <div className="transaction-table-container">

                <table className="transaction-table">

                  <thead>

                    <tr>
                      <th>Date</th>
                      <th>Transaction</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>

                  </thead>


                  <tbody>

                    {transactions.map((transaction) => {

                      const isReceived =
                        transaction.destinationAccountNumber ===
                        selectedAccount;

                      return (

                        <tr key={transaction.id}>

                          <td>
                            <div className="transaction-date">
                              {formatDate(transaction.createdAt)}
                            </div>
                          </td>


                          <td>

                            <div className="transaction-type">
                              {transaction.transactionType}
                            </div>

                            <div className="transaction-reference">
                              {transaction.transactionReference}
                            </div>

                          </td>


                          <td>

                            <div className="transaction-description">
                              {transaction.description || "-"}
                            </div>

                            <div className="transaction-accounts">

                              {isReceived
                                ? `From ${transaction.sourceAccountNumber}`
                                : `To ${transaction.destinationAccountNumber}`}

                            </div>

                          </td>


                          <td>

                            <span
                              className={
                                isReceived
                                  ? "transaction-amount received"
                                  : "transaction-amount sent"
                              }
                            >
                              {formatAmount(transaction)}
                            </span>

                          </td>


                          <td>

                            <span
                              className={`transaction-status ${transaction.status?.toLowerCase()}`}
                            >
                              {transaction.status}
                            </span>

                          </td>

                        </tr>

                      );

                    })}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        </div>

      </main>

    </div>
      {/* Logout Popup */}

      {showLogoutPopup && (

        <div className="logout-overlay">

          <div className="logout-popup">

            <h3>
              Log out?
            </h3>

            <p>
              Are you sure you want to log out of your account?
            </p>


            <div className="logout-actions">

              <button
                className="logout-no"
                onClick={cancelLogout}
              >
                No
              </button>


              <button
                className="logout-yes"
                onClick={confirmLogout}
              >
                Yes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default TransactionHistory;