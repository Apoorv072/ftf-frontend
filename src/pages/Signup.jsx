import { useState } from "react";
import { signup } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import ftfLogo from "../assets/ftf-logo-frontend.png";
import ftfBackground from "../assets/ftf-background-frontend.png";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password
      });

     console.log("Signup successful:", response);

      navigate("/verify-otp", {
      state: { email: formData.email }
  });

}catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div
          className="auth-container"
          style={{ backgroundImage: `url(${ftfBackground})` }}
        >
    <div className="login-container">
      <div className="login-card signup-card">
        <div className="login-ftf-brand">
         <h1>FTF</h1>
       
         <img
           src={ftfLogo}
           alt="FTF"
           className="login-ftf-logo"
         />
       </div>
        <p>Financial Transaction Fabric</p>

       <form onSubmit={handleSignup} className="signup-form">

  <div className="form-group">
    <label>First Name</label>
    <input
      type="text"
      name="firstName"
      placeholder="Enter your first name"
      value={formData.firstName}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Last Name</label>
    <input
      type="text"
      name="lastName"
      placeholder="Enter your last name"
      value={formData.lastName}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Email</label>
    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Phone Number</label>
    <input
      type="tel"
      name="phoneNumber"
      placeholder="Enter your phone number"
      value={formData.phoneNumber}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Create Password</label>
    <input
      type="password"
      name="password"
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Confirm Password</label>
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm your password"
      value={formData.confirmPassword}
      onChange={handleChange}
      required
    />
  </div>

  <button type="submit" className="action-button">
    Sign Up
  </button>
</form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
   </div>
  );
}

export default Signup;

