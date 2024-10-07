import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";

function ResetPasswordPage() {
  const { userId, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatusMessage("Hasła muszą być identyczne.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5244/api/Auth/ResetPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, token, newPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStatusMessage(data.message);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        const errorData = await response.json();
        console.error("Szczegóły błędu:", errorData);
        setStatusMessage(
          errorData.message || "Resetowanie hasła nie powiodło się."
        );
      }
    } catch (error) {
      console.error("Błąd połączenia:", error);
      setStatusMessage("Błąd połączenia. Spróbuj ponownie.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Resetowanie hasła</h2>
      <form onSubmit={handleResetPassword} className="reset-password-form">
        <input
          type="password"
          placeholder="Nowe hasło"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="reset-password-input"
        />
        <input
          type="password"
          placeholder="Potwierdź nowe hasło"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="reset-password-input"
        />
        <button type="submit" className="reset-password-button">
          Zresetuj hasło
        </button>
      </form>
      {statusMessage && (
        <p
          className={`status-message ${
            statusMessage.includes("nie powiodło") ? "error" : "success"
          }`}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
}

export default ResetPasswordPage;
