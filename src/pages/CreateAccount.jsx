import { useState } from "react";
import { createAccount } from "../services/accountService";
import ftfLogo from "../assets/ftf-logo-frontend.png";

function CreateAccount() {
  const [accountType, setAccountType] = useState("SAVINGS");
  const [currency, setCurrency] = useState("INR");

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    try {
      const response = await createAccount(accountType, currency);

      console.log("Account created:", response);
    } catch (error) {
      console.error("Account creation failed:", error);
    }
  };

  return (
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
          <div className="form-group">
            <label>Account Type</label>

            <select
              value={accountType}
              onChange={(event) => setAccountType(event.target.value)}
            >
              <option value="SAVINGS">Savings</option>
              <option value="CURRENT">Current</option>
            </select>
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

          <button type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;

