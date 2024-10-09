import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
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
      const response = await axiosInstance.post("/Auth/ResetPassword", {
        userId,
        token,
        newPassword,
      });

      setStatusMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Resetowanie hasła nie powiodło się.";
      console.error("Szczegóły błędu:", error);
      setStatusMessage(errorMessage);
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
