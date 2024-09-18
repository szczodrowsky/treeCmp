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
      <h1>Witaj na naszej stronie!</h1>
      <button onClick={handleLogin}>Zaloguj się</button>
      <button onClick={() => navigate("/register")}>Zarejestruj się</button>
      <button onClick={() => navigate("/dashboard")}>
        Kontynuuj bez logowania
      </button>
    </div>
  );
}

export default LandingPage;
