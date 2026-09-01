import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthWatcher() {
  const navigate = useNavigate();

  useEffect(() => {

    let timer;

    const startWatcher = () => {
      if (timer) {
        clearTimeout(timer);
      }

      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        if (!payload.exp) {
          console.error("JWT does not contain expiration time");
          return;
        }

        const expirationTime = payload.exp * 1000;
        const remainingTime = expirationTime - Date.now();

        console.log(
          "Token expires in:",
          Math.round(remainingTime / 1000),
          "seconds"
        );

        if (remainingTime <= 0) {
          sessionExpired();
          return;
        }

        timer = setTimeout(() => {
          sessionExpired();
        }, remainingTime);

      } catch (error) {
        console.error("Invalid JWT:", error);
      }
    };

    const sessionExpired = () => {
      localStorage.removeItem("token");

      window.dispatchEvent(new Event("authChange"));

      navigate("/login", {
        replace: true,
        state: {
          sessionExpired: true,
        },
      });
    };

    startWatcher();

    window.addEventListener("authChange", startWatcher);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      window.removeEventListener("authChange", startWatcher);
    };

  }, [navigate]);

  return null;
}

export default AuthWatcher;