import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function isTokenValid() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function AuthHistoryGuard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isTokenValid() &&
      (location.pathname === "/login" ||
        location.pathname === "/signup")
    ) {
      navigate("/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}

export default AuthHistoryGuard;