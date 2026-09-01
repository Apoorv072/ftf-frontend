import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link, useLocation  } from "react-router-dom";
import ftfLogo from "../assets/ftf-logo-frontend.png";
import ftfBackground from "../assets/ftf-background-frontend.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const sessionExpired = location.state?.sessionExpired;

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await login(email, password);

      localStorage.setItem("token", response.token);

      window.dispatchEvent(new Event("authChange"));

      console.log("Login successful");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${ftfBackground})` }}
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

  <p>Financial Transaction Fabric</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit">
            Login
          </button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>

    {sessionExpired && (
  <div className="session-popup">
    <div className="session-popup-content">
      <h3>Session Expired</h3>
      <p>Your session has expired. Please login again.</p>

      <button
        onClick={() =>
          navigate("/login", {
            replace: true,
            state: {},
          })
        }
      >
        OK
      </button>
    </div>
  </div>
)}
    </div>
    
  );
  
}

export default Login;