import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5244/api/Auth/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Pełna odpowiedź z serwera:", data);

        const token = data.jwtToken;
        console.log("Token JWT z odpowiedzi:", token);

        if (token) {
          localStorage.setItem("token", token);
          setAuth(data.user);
          navigate("/dashboard");
        } else {
          console.error("Token JWT nie został znaleziony w odpowiedzi.");
          alert("Token JWT nie został znaleziony. Proszę spróbować ponownie.");
        }
      } else {
        alert("Błędne dane logowania");
      }
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleResendConfirmation = () => {
    navigate("/resend-confirmation"); // Przekierowanie na stronę do ponownego wysyłania e-maila potwierdzającego
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Logowanie</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hasło"
          required
        />
        <button type="submit">Zaloguj się</button>
        <button
          onClick={handleForgotPassword}
          className="forgot-password-button"
        >
          Zapomniałem hasła
        </button>
        <button
          onClick={handleResendConfirmation}
          className="forgot-password-button"
        >
          Wyślij ponownie link potwierdzający
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
