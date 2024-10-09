import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function ConfirmEmailPage() {
  const { userId, token } = useParams();
  const [statusMessage, setStatusMessage] = useState("Email confirmation...");
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axiosInstance.get(`/Auth/ConfirmEmail`, {
          params: {
            userId,
            token: encodeURIComponent(token),
          },
        });

        setStatusMessage(response.data.message);
        setIsSuccess(true);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "There was a problem when confirming an email.";
        setStatusMessage(errorMessage);
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
