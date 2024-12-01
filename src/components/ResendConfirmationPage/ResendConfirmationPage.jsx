import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import "./ResendConfirmationPage.css";

function ResendConfirmationPage() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResendConfirmation = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatusMessage("");

    try {
      const response = await axiosInstance.post("/Auth/ResendConfirmation", {
        email,
      });

      setStatusMessage(
        response.data.message || "The confirmation link has been sent."
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "A problem has occurred. Please try again.";
      setStatusMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="resend-confirmation-container">
      <h2>Resend registration confirmation link</h2>
      <form
        onSubmit={handleResendConfirmation}
        className="resend-confirmation-form"
      >
        <input
          type="email"
          placeholder="Your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="resend-confirmation-input"
        />
        <button
          type="submit"
          className="resend-confirmation-button"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Resend confirmation link"}
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

export default ResendConfirmationPage;
