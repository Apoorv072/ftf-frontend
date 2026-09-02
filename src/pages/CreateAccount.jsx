import { useState } from "react";
import { createAccount } from "../services/accountService";
import ftfLogo from "../assets/ftf-logo-frontend.png";
import ftfaccountBackground from "../assets/ftf-Account-background.png";

function CreateAccount() {
  const [accountType, setAccountType] = useState("SAVINGS");
  const [currency, setCurrency] = useState("INR");

  const [accountCreated, setAccountCreated] = useState(false);

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    try {
   const response = await createAccount(accountType, currency);

   console.log("Account created:", response);

   setAccountCreated(true);
        } catch (error) 
        {
          console.error("Account creation failed:", error);
        }
  };

  return (
    <div
          className="auth-container"
          style={{ backgroundImage: `url(${ftfaccountBackground})` }}
        >
    <div className="login-container">
      <div className="login-card">

        <div className="login-ftf-brand">
          <h1>FTF</h1>

          <img
            src={ftfLogo}
            alt="FTF"
            className="login-ftf-logo"
          />
        </div>

        <p>Create your bank account</p>

        <form onSubmit={handleCreateAccount}>

          {/* Account Type */}
          <div className="form-group">
            <label>Account Type</label>

            <div className="custom-select">
              <select
                value={accountType}
                onChange={(event) => setAccountType(event.target.value)}
              >
                <option value="SAVINGS">Savings Account</option>
                <option value="CURRENT">Current Account</option>
              </select>

              <span className="select-arrow">⌄</span>
            </div>
          </div>

          {/* Currency */}
          <div className="form-group">
            <label>Currency</label>

            <div className="custom-select">
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              >
                <option value="INR">Indian Rupee (INR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>

              <span className="select-arrow">⌄</span>
            </div>
          </div>

          <button type="submit" className="action-button">
            Create Account
          </button>

        </form>
      </div>
      </div>
      {accountCreated && (
  <div className="session-popup">
    <div className="session-popup-content">
      <h3>Account Created!</h3>

      <p>Your bank account has been created successfully.</p>

      <button
        onClick={() => setAccountCreated(false)}
      >
        OK
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default CreateAccount;