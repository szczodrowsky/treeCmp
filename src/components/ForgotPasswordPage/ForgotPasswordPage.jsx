import { useState } from "react";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5244/api/Auth/ForgotPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStatusMessage(data.message);
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.message || "Request failed. Try again.");
      }
    } catch (error) {
      setStatusMessage("Error sending request. Try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Resetowanie hasła</h2>
      <form onSubmit={handleForgotPassword} className="forgot-password-form">
        <input
          type="email"
          placeholder="Twój e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-password-input"
        />
        <button type="submit" className="forgot-password-button">
          Wyślij link do resetu hasła
        </button>
      </form>
      {statusMessage && (
        <p
          className={`status-message ${
            statusMessage.includes("failed") || statusMessage.includes("Error")
              ? "error"
              : "success"
          }`}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
