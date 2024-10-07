import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ConfirmEmailPage() {
  const { userId, token } = useParams();
  const [statusMessage, setStatusMessage] = useState(
    "Potwierdzanie e-maila..."
  );
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5244/api/Auth/ConfirmEmail?userId=${userId}&token=${encodeURIComponent(
            token
          )}`,
          { method: "GET" }
        );

        if (response.ok) {
          const data = await response.json();
          setStatusMessage(data.message);
          setIsSuccess(true);
        } else {
          const errorData = await response.json();
          setStatusMessage(
            errorData.message ||
              "Wystąpił problem podczas potwierdzania e-maila."
          );
          setIsSuccess(false);
        }
      } catch (error) {
        setStatusMessage(
          "Błąd połączenia z serwerem. Spróbuj ponownie później."
        );
        setIsSuccess(false);
      }
    };

    confirmEmail();
  }, [userId, token]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Potwierdzenie E-maila</h2>
      <p style={{ color: isSuccess ? "green" : "red" }}>{statusMessage}</p>
    </div>
  );
}

export default ConfirmEmailPage;
