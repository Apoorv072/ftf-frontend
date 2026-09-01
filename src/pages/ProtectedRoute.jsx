import { Navigate, Outlet } from "react-router-dom";

function isTokenValid() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // JWT exp is in seconds
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
}

function ProtectedRoute() {
  if (!isTokenValid()) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;