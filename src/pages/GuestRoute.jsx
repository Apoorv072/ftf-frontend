import { Navigate, Outlet } from "react-router-dom";

function GuestRoute() {

  console.log("GuestRoute is running");

  const token = localStorage.getItem("token");

  console.log("Token exists:", !!token);

  if (token) {
    console.log("User is logged in - redirecting");
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;