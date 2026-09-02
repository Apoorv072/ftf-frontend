import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/accountService";
import ftfBackground from "../assets/ftf-otpVerification-background.png";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOtpChange = (value, index) => {
    // Allow only one digit
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    setError("");

    // Move to next box
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (event, index) => {
    // Move to previous box when backspace is pressed
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await verifyOtp({
        email,
        otp: otpValue
      });

      console.log("OTP verification successful:", response);

      navigate("/login");

    } catch (error) {
      console.error("OTP verification failed:", error);

      setError(
        error.response?.data?.message ||
        "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="auth-container">
        <div className="login-card">
          <h1>Invalid Request</h1>

          <p>
            Please complete the registration process again.
          </p>
        </div>
      </div>
    );
  }

  return (
     <div
          className="auth-container"
          style={{ backgroundImage: `url(${ftfBackground})` }}
        >
    <div className="auth-container">

      <div className="login-card">

        <h1>Verify Email</h1>

        <p>
          Enter the 6-digit OTP sent to
          <br />
          <strong>{email}</strong>
        </p>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <form onSubmit={handleVerifyOtp}>

          <div className="otp-input-container">

            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                className="otp-box"
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(event) =>
                  handleOtpChange(
                    event.target.value,
                    index
                  )
                }
                onKeyDown={(event) =>
                  handleOtpKeyDown(event, index)
                }
                autoComplete="one-time-code"
              />
            ))}

          </div>

          <button type="submit" disabled={loading} className="action-button" >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

      </div>

    </div>
    </div>
  );
}

export default VerifyOtp;