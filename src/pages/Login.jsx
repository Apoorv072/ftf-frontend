import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import ftfLogo from "../assets/ftf-logo-frontend.png";
import ftfBackground from "../assets/ftf-background-frontend.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await login(email, password);

      localStorage.setItem("token", response.token);

      console.log("Login successful");

      navigate("/dashboard");
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

          <button type="submit" className="login-button">
            Login
          </button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;