import { useState } from "react";
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
      const response = await fetch(
        "http://localhost:5244/api/Auth/ResendConfirmation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStatusMessage(data.message || "Link potwierdzający został wysłany.");
      } else {
        const errorData = await response.json();
        setStatusMessage(
          errorData.message || "Wystąpił problem. Spróbuj ponownie."
        );
      }
    } catch (error) {
      setStatusMessage("Błąd połączenia. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="resend-confirmation-container">
      <h2>Wysyłanie potwierdzenia konta</h2>
      <form
        onSubmit={handleResendConfirmation}
        className="resend-confirmation-form"
      >
        <input
          type="email"
          placeholder="Twój e-mail"
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
          {isLoading ? "Wysyłanie..." : "Wyślij ponownie link potwierdzający"}
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
