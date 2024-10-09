import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/Auth/ForgotPassword", {
        email,
      });
      setStatusMessage(
        response.data.message || "Link do resetu hasła został wysłany."
      );
    } catch (error) {
      if (error.response && error.response.data) {
        setStatusMessage(
          error.response.data.message ||
            "Wystąpił problem z wysyłaniem zapytania. Spróbuj ponownie."
        );
      } else {
        setStatusMessage("Błąd połączenia. Spróbuj ponownie.");
      }
      console.error("Błąd wysyłania zapytania:", error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Password reset</h2>
      <form onSubmit={handleForgotPassword} className="forgot-password-form">
        <input
          type="email"
          placeholder="Your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-password-input"
        />
        <button type="submit" className="forgot-password-button">
          Send link to reset password
        </button>
      </form>
      {statusMessage && (
        <p
          className={`status-message ${
            statusMessage.includes("problem") || statusMessage.includes("Błąd")
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
