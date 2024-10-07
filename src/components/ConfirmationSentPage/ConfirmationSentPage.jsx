import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function ConfirmationSentPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const status = queryParams.get("status");

  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (status === "success") {
      setStatusMessage(
        `Link potwierdzający został wysłany na adres: ${email}. Sprawdź swoją skrzynkę pocztową.`
      );
    } else {
      setStatusMessage(
        "Wystąpił problem podczas wysyłania e-maila potwierdzającego. Spróbuj ponownie później."
      );
    }
  }, [email, status]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{status === "success" ? "Sukces!" : "Błąd"}</h2>
      <p style={{ color: status === "success" ? "green" : "red" }}>
        {statusMessage}
      </p>
    </div>
  );
}

export default ConfirmationSentPage;
