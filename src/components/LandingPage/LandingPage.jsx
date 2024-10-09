import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Current location:", location.pathname);
  }, [location]);

  const handleLogin = () => {
    console.log("Navigating to /login");
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <h1>TreeCmp</h1>
      <button onClick={handleLogin}>Log In</button>
      <button onClick={() => navigate("/register")}>Sign Up</button>
      <button onClick={() => navigate("/dashboard")}>
        Continue Without Logging In
      </button>
      <img
        src="/assets/logo.png"
        alt="Company Logo"
        className="landing-page-logo"
      />
    </div>
  );
}

export default LandingPage;
